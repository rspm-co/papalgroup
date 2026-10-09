import { getPool, query } from '../config/db.js'
import { models } from './models.js'
import { isRecordId, identifier } from './repository.js'

// Accept MongoDB Compass/mongoexport Extended JSON without a MongoDB runtime dependency.
export function fromExtendedJson(value) {
  if (Array.isArray(value)) return value.map(fromExtendedJson)
  if (!value || typeof value !== 'object' || value instanceof Date) return value
  if (Object.hasOwn(value, '$oid')) return value.$oid
  if (Object.hasOwn(value, '$date')) return new Date(fromExtendedJson(value.$date))
  for (const key of ['$numberLong', '$numberInt', '$numberDouble']) if (Object.hasOwn(value, key)) return Number(value[key])
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, fromExtendedJson(child)]))
}

export const importData = async (raw, { apply = false } = {}) => {
  if (!raw || Array.isArray(raw) || typeof raw !== 'object') throw new Error('Expected an object of collection arrays')
  const data = fromExtendedJson(raw)
  const groups = new Map()
  for (const [collection, rows] of Object.entries(data)) {
    const table = { authusers: 'users', galleries: 'gallery' }[collection] || collection
    const model = [...models.values()].find(item => item.table === table)
    if (!model || !Array.isArray(rows) || groups.has(table)) throw new Error('Unknown or duplicate collection, or invalid collection array')
    const ids = new Set()
    for (const row of rows) {
      if (!isRecordId(row._id) || ids.has(row._id)) throw new Error('Every imported record needs a unique original 24-character id')
      ids.add(row._id)
      if (table === 'users') {
        if (!/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(row.password)) throw new Error('Admin exports must include their original bcrypt password hash')
        row.tokenVersion = Number(row.tokenVersion || 0) + 1
      }
    }
    groups.set(table, { model, rows, ids })
  }
  function checkReferences(spec, value) {
    if (value === null || value === undefined) return
    if (spec.ref && !groups.get(models.get(spec.ref).table)?.ids.has(value)) throw new Error('Export contains a reference to a missing record; export all referenced collections')
    if (spec.type === 'Array') {
      if (!Array.isArray(value)) throw new Error('Invalid exported array')
      for (const child of value) checkReferences(spec.fields ? { fields: spec.fields } : spec.item, child)
    } else if (spec.fields) for (const [key, childSpec] of Object.entries(spec.fields)) checkReferences(childSpec, value[key])
  }
  for (const { model, rows } of groups.values()) for (const row of rows) for (const [key, spec] of Object.entries(model.fields)) checkReferences(spec, row[key])
  const connection = await getPool().getConnection()
  let locked = false
  try {
    const result = await query("SELECT GET_LOCK(CONCAT('papal:import:', LEFT(SHA2(DATABASE(), 256), 48)), 30) AS acquired", [], connection)
    if (Number(result[0].acquired) !== 1) throw new Error('Could not acquire import lock')
    locked = true
    await connection.beginTransaction()
    // Import into an empty application database only. Never overwrite live records.
    for (const model of models.values()) {
      const existing = await query(`SELECT _id FROM ${identifier(model.table)} LIMIT 1 FOR UPDATE`, [], connection)
      if (existing.length) throw new Error('Import requires empty application tables; use a new database and stop the application before importing')
    }
    const counts = {}
    for (const model of models.values()) {
      const rows = groups.get(model.table)?.rows || []
      for (const row of rows) await model.create(row, connection)
      counts[model.table] = rows.length
    }
    if (apply) await connection.commit()
    else await connection.rollback()
    return { applied: apply, counts }
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    try { if (locked) await query("SELECT RELEASE_LOCK(CONCAT('papal:import:', LEFT(SHA2(DATABASE(), 256), 48)))", [], connection) }
    finally { connection.release() }
  }
}
