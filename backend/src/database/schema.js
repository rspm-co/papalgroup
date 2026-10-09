import { models } from './models.js'
import { identifier } from './repository.js'

const sqlType = spec => {
  if (spec.type === 'Id') return 'CHAR(24)'
  if (spec.type === 'Boolean') return 'TINYINT(1)'
  if (spec.type === 'Number') return 'BIGINT'
  if (spec.type === 'Date') return 'DATETIME(3)'
  if (['Array', 'Embedded'].includes(spec.type)) return 'JSON'
  if (spec.unique) return 'VARCHAR(254)'
  if (spec.enum) return 'VARCHAR(64)'
  return 'TEXT'
}

export const schemaStatements = () => {
  const statements = []
  for (const model of models.values()) {
    const columns = Object.entries(model.fields).map(([key, spec]) => `${identifier(key)} ${sqlType(spec)}${key === '_id' ? ' NOT NULL PRIMARY KEY' : spec.required || ['createdAt', 'updatedAt'].includes(key) ? ' NOT NULL' : ' NULL'}`)
    if (['homepages', 'settings'].includes(model.table)) columns.push('`singleton` TINYINT NOT NULL DEFAULT 1 UNIQUE CHECK (`singleton` = 1)')
    for (const [key, spec] of Object.entries(model.fields)) if (spec.unique) columns.push(`UNIQUE KEY ${identifier('uq_' + key)} (${identifier(key)})`)
    const indexes = [...model.indexes, ['createdAt']]
    for (const [index, keys] of indexes.entries()) {
      if (keys.some(key => !model.fields[key] || ['Array', 'Embedded'].includes(model.fields[key].type))) continue
      columns.push(`KEY ${identifier('idx_' + index)} (${keys.map(key => identifier(key) + (sqlType(model.fields[key]) === 'TEXT' ? '(191)' : '')).join(', ')})`)
    }
    for (const [key, spec] of Object.entries(model.fields)) if (spec.ref) {
      const target = models.get(spec.ref)
      columns.push(`CONSTRAINT ${identifier('fk_' + model.table + '_' + key)} FOREIGN KEY (${identifier(key)}) REFERENCES ${identifier(target.table)} (_id) ON DELETE RESTRICT`)
    }
    statements.push(`CREATE TABLE IF NOT EXISTS ${identifier(model.table)} (\n  ${columns.join(',\n  ')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
  }
  return statements
}
