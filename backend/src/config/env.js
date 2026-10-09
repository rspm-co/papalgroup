import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { validateEnvironment } from './environment.js'

dotenv.config({ path: [fileURLToPath(new URL('../../../.env', import.meta.url)), fileURLToPath(new URL('../../.env', import.meta.url))], quiet: true })
export const env = validateEnvironment(process.env)
