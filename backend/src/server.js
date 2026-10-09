import app from './app.js'
import { connectDatabase, disconnectDatabase } from './config/db.js'
import { env } from './config/env.js'
import { describeStartupError } from './utils/startupError.js'

let server
let isShuttingDown = false

const shutdown = async (signal, exitCode = 0) => {
  if (isShuttingDown) return
  isShuttingDown = true
  console.info(`${signal}: stopping server`)
  const deadline = setTimeout(() => { server?.closeAllConnections(); process.exit(1) }, 10000)
  deadline.unref()
  try {
    if (server) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await disconnectDatabase()
    clearTimeout(deadline)
    process.exit(exitCode)
  } catch {
    process.exit(1)
  }
}

const startServer = async () => {
  await connectDatabase()
  if (env.bootstrapAdmin) {
    const { ensureAdmin } = await import('./database/admin.js')
    await ensureAdmin()
  }
  server = app.listen(env.port, '0.0.0.0', () => console.info(`Server listening on port ${env.port} in ${env.nodeEnv} mode`))
  server.on('error', error => { console.error(describeStartupError(error)); shutdown('HTTP server failure', 1) })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('unhandledRejection', () => shutdown('Unhandled rejection', 1))
process.on('uncaughtException', () => shutdown('Uncaught exception', 1))
startServer().catch(error => {
  console.error(describeStartupError(error))
  return shutdown('Startup failed', 1)
})
