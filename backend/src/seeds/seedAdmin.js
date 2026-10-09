import { connectDatabase, disconnectDatabase } from '../config/db.js'
import { ensureAdmin } from '../database/admin.js'

const seedAdmin = async () => {
  try {
    await connectDatabase()
    await ensureAdmin()
  } finally {
    await disconnectDatabase()
  }
}

seedAdmin().catch(error => {
  console.error(error.name === 'Error' ? error.message : 'Admin creation failed; check database access and environment configuration')
  process.exitCode = 1
})
