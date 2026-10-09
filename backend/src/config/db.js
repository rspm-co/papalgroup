import mysql from 'mysql2/promise'
import { env } from './env.js'
import ApiError from '../utils/ApiError.js'

let pool
export const getPool = () => {
  if (!pool) throw new ApiError(503, 'Database unavailable')
  return pool
}

export const query = async (sql, values = [], connection) => {
  const [result] = await (connection || getPool()).execute({ sql, timeout: 10000 }, values)
  return result
}

export const transaction = async (work) => {
  const connection = await getPool().getConnection()
  try {
    await connection.beginTransaction()
    const result = await work(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally { connection.release() }
}

export const databaseReady = async () => {
  if (!pool) return false
  try { await query('SELECT 1'); return true } catch { return false }
}

export const connectDatabase = async ({ migrate = env.dbAutoMigrate } = {}) => {
  if (pool) return pool
  pool = mysql.createPool({
    host: env.dbHost, port: env.dbPort, user: env.dbUser, password: env.dbPassword,
    database: env.dbName, connectionLimit: env.dbPoolSize, waitForConnections: true,
    queueLimit: 100, connectTimeout: 10000, timezone: 'Z', charset: 'utf8mb4',
    multipleStatements: false, enableKeepAlive: true,
    ...(env.dbSsl ? { ssl: { rejectUnauthorized: true, ...(env.dbSslCa ? { ca: env.dbSslCa.replace(/\\n/g, '\n') } : {}) } } : {}),
  })
  try {
    await query('SELECT 1')
    const { migrateDatabase, verifySchema } = await import('../database/migrate.js')
    if (migrate) await migrateDatabase()
    else await verifySchema()
    console.info('MySQL connected; schema verified')
    return pool
  } catch (error) {
    await disconnectDatabase()
    throw error
  }
}

export const disconnectDatabase = async () => {
  const current = pool
  pool = undefined
  if (current) await current.end()
}
