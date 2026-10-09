import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = fileURLToPath(new URL('../', import.meta.url))
const name = `hostinger-mysql-${new Date().toISOString().replace(/[:.]/g, '-')}`
const destination = path.join(root, 'release', name)
await mkdir(destination, { recursive: true })
// Explicit allowlist: no secrets, databases, uploads, dependencies, caches or local tools.
const entries = ['package.json', 'package-lock.json', 'server.js', '.env.example', 'README.md', 'DEPLOYMENT.md', 'scripts', 'hosting', 'backend/package.json', 'backend/src', 'backend/test', 'frontend/package.json', 'frontend/index.html', 'frontend/vite.config.js', 'frontend/eslint.config.js', 'frontend/src', 'frontend/public', 'frontend/dist', 'admin/package.json', 'admin/index.html', 'admin/vite.config.js', 'admin/src', 'admin/dist']
entries.push('backend/migrations', 'DATABASE.md')
for (const entry of entries) await cp(path.join(root, entry), path.join(destination, entry), { recursive: true })
const lock = await readFile(path.join(destination, 'package-lock.json'))
const migration = await readFile(path.join(destination, 'backend/migrations/001_initial.sql'))
await writeFile(path.join(destination, 'release-manifest.json'), JSON.stringify({ createdAt: new Date().toISOString(), node: process.version, database: 'mysql', migration: '001_initial', migrationSha256: createHash('sha256').update(migration).digest('hex'), lockfileSha256: createHash('sha256').update(lock).digest('hex'), excluded: ['.env', 'node_modules', 'uploads', 'tmp', '.git'], note: 'Configure MySQL and production environment variables in Hostinger and rebuild for your domain before going live. See DEPLOYMENT.md and DATABASE.md.' }, null, 2) + '\n')
console.info(`Hostinger upload folder: ${destination}`)
