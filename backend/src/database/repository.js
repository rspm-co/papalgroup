import { randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { query, transaction } from '../config/db.js'
import ApiError from '../utils/ApiError.js'

// Allowlisted fields and operators compile to prepared SQL. Keep opaque IDs for API compatibility.
export const newId = () => randomBytes(12).toString('hex')
export const isRecordId = value => typeof value === 'string' && /^[a-f\d]{24}$/i.test(value)
export const models = new Map()
export const identifier = value => {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) throw new Error('Invalid SQL identifier')
  return '`' + value + '`'
}
export const escapeLike = value => String(value).replace(/[!%_]/g, '!$&')
const invalid = field => { throw new ApiError(400, `Invalid ${field}`) }

function normalizeValue(field, spec, input) {
  let value = input
  if (value === undefined && spec.defaultNow) value = new Date()
  if (value === undefined && Object.hasOwn(spec, 'default')) value = structuredClone(spec.default)
  if (value === undefined) value = spec.type === 'Array' ? [] : null
  if (value === null) {
    if (spec.required) invalid(field)
    return null
  }
  if (spec.type === 'String') {
    if (typeof value !== 'string') invalid(field)
    if (spec.trim) value = value.trim()
    if (spec.lowercase) value = value.toLowerCase()
    if (spec.required && !value) invalid(field)
    if (spec.unique && value.length > 254) invalid(field)
  } else if (spec.type === 'Id') {
    if (!isRecordId(value)) invalid(field)
  } else if (spec.type === 'Boolean') {
    if (![true, false, 0, 1].includes(value)) invalid(field)
    value = Boolean(value)
  } else if (spec.type === 'Number') {
    value = Number(value)
    if (!Number.isSafeInteger(value) || (spec.min !== undefined && value < spec.min)) invalid(field)
  } else if (spec.type === 'Date') {
    value = new Date(value)
    if (!Number.isFinite(value.getTime())) invalid(field)
  } else if (spec.type === 'Array') {
    if (!Array.isArray(value)) invalid(field)
    if (spec.minItems && value.length < spec.minItems) invalid(field)
    value = value.map(item => spec.fields ? normalizeObject(spec.fields, item, spec.subIds) : normalizeValue(field, spec.item, item))
  } else if (spec.fields) {
    value = normalizeObject(spec.fields, value, spec.subIds)
  }
  if (spec.enum && !spec.enum.includes(value)) invalid(field)
  return value
}

function normalizeObject(fields, input, subIds = false) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('object')
  const result = {}
  if (subIds) result._id = isRecordId(input._id) ? input._id : newId()
  for (const [field, spec] of Object.entries(fields)) result[field] = normalizeValue(field, spec, input[field])
  return result
}

const encode = (spec, value) => value === null ? null : ['Array', 'Embedded'].includes(spec.type) ? JSON.stringify(value) : value
const decode = (spec, value) => {
  if (value === null) return null
  if (spec.type === 'Boolean') return Boolean(value)
  if (spec.type === 'Number') return Number(value)
  if (['Array', 'Embedded'].includes(spec.type)) return typeof value === 'string' ? JSON.parse(value) : value
  return value
}

export function compileFilters(model, filters = {}, values = []) {
  const conditions = []
  for (const [field, value] of Object.entries(filters)) {
    if (field === 'or') {
      if (!Array.isArray(value) || !value.length) throw new Error('Empty OR filter')
      conditions.push('(' + value.map(part => compileFilters(model, part, values)).join(' OR ') + ')')
      continue
    }
    const [root, ...path] = field.split('.')
    if (!model.fields[root]) throw new Error('Unknown database filter field')
    let column = identifier(root)
    let spec = model.fields[root]
    if (path.length) {
      for (const part of path) {
        if (!spec.fields?.[part]) throw new Error('Unknown JSON filter field')
        spec = spec.fields[part]
      }
      column = `JSON_UNQUOTE(JSON_EXTRACT(${column}, '$.${path.map(part => '"' + part + '"').join('.')}'))`
    }
    const bind = data => { values.push(data instanceof Date ? data : typeof data === 'boolean' && path.length ? String(data) : data); return '?' }
    if (value === null) { conditions.push(`${column} IS NULL`); continue }
    if (value instanceof Date || typeof value !== 'object') { conditions.push(`${column} = ${bind(value)}`); continue }
    for (const [operator, data] of Object.entries(value)) {
      if (operator === 'contains') {
        conditions.push(`LOWER(${column}) LIKE LOWER(${bind('%' + escapeLike(data) + '%')}) ESCAPE '!'`)
      } else if (operator === 'in') {
        if (!Array.isArray(data)) throw new Error('Invalid IN filter')
        if (!data.length) { conditions.push('0 = 1'); continue }
        if (spec.type === 'Array') conditions.push('(' + data.map(item => `JSON_CONTAINS(${column}, ${bind(JSON.stringify(item))})`).join(' OR ') + ')')
        else conditions.push(`${column} IN (${data.map(bind).join(', ')})`)
      } else {
        const op = { gte: '>=', lte: '<=', ne: '<>' }[operator]
        if (!op) throw new Error('Unknown database filter operator')
        conditions.push(data === null ? `${column} IS NOT NULL` : `${column} ${op} ${bind(data)}`)
      }
    }
  }
  return conditions.join(' AND ') || '1 = 1'
}

function sqlError(error) {
  if (error.code === 'ER_DUP_ENTRY') throw new ApiError(409, 'A record with this unique value already exists')
  if (['ER_NO_REFERENCED_ROW_2', 'ER_ROW_IS_REFERENCED_2'].includes(error.code)) throw new ApiError(409, 'The record has an invalid or existing reference')
  throw error
}

class ReadQuery {
  constructor(model, filters, single, work) {
    Object.assign(this, { model, filters, single, work, sorting: { createdAt: -1, _id: -1 }, offset: 0, maximum: single ? 1 : null, relations: [], secrets: new Set() })
  }
  sort(value) { this.sorting = { ...value, _id: value._id || -1 }; return this }
  skip(value) { this.offset = Number(value); return this }
  limit(value) { this.maximum = Number(value); return this }
  includeSecrets(value) { for (const key of value.split(/\s+/)) this.secrets.add(key.replace(/^\+/, '')); return this }
  withRelations(path, fields) { this.relations.push({ path, fields }); return this }
  then(resolve, reject) { return this.execute().then(resolve, reject) }
  async execute(connection, lock = false) {
    if (this.work) {
      const result = await this.work()
      if (!result) return null
      return this.finish([result], connection).then(items => items[0])
    }
    const values = []
    const where = compileFilters(this.model, this.filters, values)
    const order = Object.entries(this.sorting).map(([field, direction]) => {
      if (!this.model.fields[field]) throw new Error('Unknown database sort field')
      if (Array.isArray(direction)) {
        if (!this.model.fields[field].enum || direction.some(value => !this.model.fields[field].enum.includes(value))) throw new Error('Invalid enum sort')
        values.push(...direction)
        return `FIELD(${identifier(field)}, ${direction.map(() => '?').join(', ')}) ASC`
      }
      return identifier(field) + (direction === 1 ? ' ASC' : ' DESC')
    }).join(', ')
    if (!Number.isSafeInteger(this.offset) || this.offset < 0 || (this.maximum !== null && (!Number.isSafeInteger(this.maximum) || this.maximum < 1))) throw new Error('Invalid pagination')
    // Interpolated pagination values have been validated as nonnegative safe integers.
    const limit = this.maximum === null ? '' : ` LIMIT ${this.maximum} OFFSET ${this.offset}`
    const rows = await query(`SELECT * FROM ${identifier(this.model.table)} WHERE ${where}${order ? ' ORDER BY ' + order : ''}${limit}${lock ? ' FOR UPDATE' : ''}`, values, connection)
    const results = await this.finish(rows.map(row => this.model.decode(row)), connection)
    return this.single ? results[0] || null : results
  }
  async finish(items, connection) {
    for (const item of items) for (const [field, spec] of Object.entries(this.model.fields)) if (spec.select === false && !this.secrets.has(field)) delete item[field]
    for (const { path, fields } of this.relations) {
      const parts = path.split('.')
      let spec = this.model.fields[parts[0]]
      for (const part of parts.slice(1)) spec = spec?.fields?.[part]
      const reference = spec?.ref || spec?.item?.ref
      const target = models.get(reference)
      if (!target) throw new Error('Unknown database relation')
      const locations = []
      function collect(parent, remaining) {
        if (Array.isArray(parent)) { for (const child of parent) collect(child, remaining); return }
        if (!parent) return
        const [key, ...rest] = remaining
        if (rest.length) collect(parent[key], rest)
        else if (Array.isArray(parent[key])) { for (let index = 0; index < parent[key].length; index++) locations.push([parent[key], index]) }
        else locations.push([parent, key])
      }
      for (const item of items) collect(item, parts)
      const ids = [...new Set(locations.map(([parent, key]) => parent[key]).filter(Boolean))]
      if (!ids.length) continue
      const results = await target.find({ _id: { in: ids } }).execute(connection)
      const selected = new Map(results.map(result => [result._id, fields ? Object.fromEntries(['_id', ...fields.split(' ')].filter(key => Object.hasOwn(result, key)).map(key => [key, result[key]])) : result]))
      for (const [parent, key] of locations) parent[key] = selected.get(parent[key]) || null
    }
    return items
  }
}

export function defineModel({ name, table, fields, indexes = [] }) {
  const model = {
    name, table, indexes,
    fields: { _id: { type: 'Id' }, ...fields, createdAt: { type: 'Date' }, updatedAt: { type: 'Date' } },
    decode(row) { return Object.fromEntries(Object.entries(row).filter(([key]) => this.fields[key]).map(([key, value]) => [key, decode(this.fields[key], value)])) },
    find(filters = {}) { return new ReadQuery(this, filters, false) },
    findOne(filters = {}) { return new ReadQuery(this, filters, true) },
    findById(id) { return this.findOne({ _id: id }) },
    async count(filters = {}) {
      const values = []; const where = compileFilters(this, filters, values)
      const rows = await query(`SELECT COUNT(*) AS total FROM ${identifier(table)} WHERE ${where}`, values)
      return Number(rows[0].total)
    },
    async exists(filters) { return Boolean(await this.findOne(filters)) },
    async create(input, connection) {
      const row = normalizeObject(fields, input)
      row._id = input._id || newId()
      if (!isRecordId(row._id)) invalid('id')
      row.createdAt = input.createdAt ? new Date(input.createdAt) : new Date()
      row.updatedAt = input.updatedAt ? new Date(input.updatedAt) : row.createdAt
      if (!Number.isFinite(row.createdAt.getTime()) || !Number.isFinite(row.updatedAt.getTime())) invalid('timestamps')
      if (name === 'AuthUser' && !/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(row.password)) row.password = await bcrypt.hash(row.password, 12)
      const keys = Object.keys(row)
      try { await query(`INSERT INTO ${identifier(table)} (${keys.map(identifier).join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`, keys.map(key => encode(this.fields[key], row[key])), connection) } catch (error) { sqlError(error) }
      for (const [key, spec] of Object.entries(fields)) if (spec.select === false) delete row[key]
      return row
    },
    updateFirst(filters, patch) {
      return new ReadQuery(this, filters, true, () => transaction(async connection => {
        const current = await this.findOne(filters).includeSecrets('password tokenVersion').execute(connection, true)
        if (!current) return null
        const changes = typeof patch === 'function' ? await patch(current) : patch
        const result = { ...current }
        for (const [key, value] of Object.entries(changes)) {
          if (!fields[key] || fields[key].immutable) invalid(key)
          result[key] = normalizeValue(key, fields[key], value)
        }
        result.updatedAt = new Date()
        const keys = [...Object.keys(changes), 'updatedAt']
        try { await query(`UPDATE ${identifier(table)} SET ${keys.map(key => identifier(key) + ' = ?').join(', ')} WHERE _id = ?`, [...keys.map(key => encode(this.fields[key], result[key])), current._id], connection) } catch (error) { sqlError(error) }
        return result
      }))
    },
    updateById(id, patch) { return this.updateFirst({ _id: id }, patch) },
    async deleteById(id) {
      return transaction(async connection => {
        const current = await this.findById(id).execute(connection, true)
        if (!current) return null
        try { await query(`DELETE FROM ${identifier(table)} WHERE _id = ?`, [id], connection) } catch (error) { sqlError(error) }
        return current
      })
    },
  }
  models.set(name, model)
  return model
}
