import { readFile } from 'node:fs/promises'
import { connectDatabase, disconnectDatabase } from '../backend/src/config/db.js'
import { importData } from '../backend/src/database/import-data.js'

try {
  const filename = process.argv[2]
  if (!filename || filename.startsWith('--')) throw new Error('Usage: npm run db:import -- path/to/private-export.json [--apply]')
  const data = JSON.parse(await readFile(filename, 'utf8'))
  await connectDatabase()
  const result = await importData(data, { apply: process.argv.includes('--apply') })
  console.info(JSON.stringify(result, null, 2))
  console.info(result.applied ? 'Import committed. Verify counts before switching the live application.' : 'Dry run passed; all inserted rows were rolled back. Use --apply to commit.')
} catch (error) {
  // Duplicate/data SQL errors can contain personal information; keep command output safe.
  console.error('Import failed:', error.code || (error.name === 'Error' ? error.message : 'Invalid data; inspect the private export'))
  process.exitCode = 1
} finally { await disconnectDatabase() }
