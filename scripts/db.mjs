import { mkdir, writeFile } from 'node:fs/promises'
import { describeStartupError } from '../backend/src/utils/startupError.js'

const command = process.argv[2]
if (command === 'generate-schema') {
  const { schemaStatements } = await import('../backend/src/database/schema.js')
  await mkdir(new URL('../backend/migrations/', import.meta.url), { recursive: true })
  await writeFile(new URL('../backend/migrations/001_initial.sql', import.meta.url), schemaStatements().join(';\n\n') + ';\n')
  console.info('Generated initial MySQL schema. Never change an already applied migration.')
} else {
  const { connectDatabase, disconnectDatabase } = await import('../backend/src/config/db.js')
  try {
    await connectDatabase({ migrate: command === 'migrate' })
    console.info(command === 'migrate' ? 'MySQL schema is up to date.' : 'MySQL connection and schema verified.')
  } catch (error) {
    console.error('Database setup failed:', describeStartupError(error))
    process.exitCode = 1
  } finally { await disconnectDatabase() }
}
