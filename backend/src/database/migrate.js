import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { getPool, query } from '../config/db.js'

const migration = await readFile(new URL('../../migrations/001_initial.sql', import.meta.url), 'utf8')
const checksum = createHash('sha256').update(migration).digest('hex')
const statements = migration.split(';').map(sql => sql.trim()).filter(Boolean)
const version = '001_initial'

export const verifySchema = async () => {
  let rows
  try { rows = await query('SELECT checksum FROM schema_migrations WHERE version = ?', [version]) }
  catch (error) {
    if (error.code !== 'ER_NO_SUCH_TABLE') throw error
    throw Object.assign(new Error('MySQL schema missing; run npm run db:migrate or enable DB_AUTO_MIGRATE=true for the first deployment'), { code: 'SCHEMA_MISSING' })
  }
  if (rows.length !== 1 || rows[0].checksum !== checksum) throw Object.assign(new Error('Database migration mismatch; apply the versioned MySQL migrations before starting'), { code: 'SCHEMA_MISMATCH' })
}

export const migrateDatabase = async () => {
  const connection = await getPool().getConnection()
  let locked = false
  try {
    const locks = await query("SELECT GET_LOCK(CONCAT('papal:migrate:', LEFT(SHA2(DATABASE(), 256), 48)), 30) AS acquired", [], connection)
    if (Number(locks[0].acquired) !== 1) throw new Error('Could not acquire schema migration lock')
    locked = true
    await query('CREATE TABLE IF NOT EXISTS schema_migrations (version VARCHAR(64) PRIMARY KEY, checksum CHAR(64) NOT NULL, appliedAt DATETIME(3) NOT NULL) ENGINE=InnoDB', [], connection)
    const rows = await query('SELECT checksum FROM schema_migrations WHERE version = ?', [version], connection)
    if (rows.length) {
      if (rows[0].checksum !== checksum) throw Object.assign(new Error('Applied migration was modified; restore the original migration'), { code: 'SCHEMA_MISMATCH' })
      return
    }
    // MySQL DDL commits implicitly. Each initial CREATE is retryable; mark complete only after all succeed.
    for (const statement of statements) await connection.query(statement)
    await query('INSERT INTO schema_migrations (version, checksum, appliedAt) VALUES (?, ?, ?)', [version, checksum, new Date()], connection)
    console.info('Applied MySQL migration 001_initial')
  } finally {
    try { if (locked) await query("SELECT RELEASE_LOCK(CONCAT('papal:migrate:', LEFT(SHA2(DATABASE(), 256), 48)))", [], connection) }
    finally { connection.release() }
  }
}
