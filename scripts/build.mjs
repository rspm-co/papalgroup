import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
if (existsSync(path.join(root, '.env'))) process.loadEnvFile(path.join(root, '.env'))
const siteUrl = process.env.VITE_SITE_URL || process.env.PUBLIC_URL
if (siteUrl) {
  const url = new URL(siteUrl)
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('PUBLIC_URL/VITE_SITE_URL must be a website origin, without a path, query or credentials')
  }
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') throw new Error('Production site URL must use HTTPS')
  process.env.VITE_SITE_URL = url.origin
}

for (const workspace of ['frontend', 'admin']) {
  const result = spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'build', '--workspace', workspace], { cwd: root, stdio: 'inherit', env: process.env })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

const robots = ['User-agent: *', 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/']
if (siteUrl && new URL(siteUrl).protocol === 'https:') {
  const origin = new URL(siteUrl).origin
  robots.push(`Sitemap: ${origin}/sitemap.xml`)
  const routes = ['/', '/about', '/brands', '/gallery', '/awards', '/careers', '/contact', '/franchise-enquiry']
  const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
  await writeFile(path.join(root, 'frontend/dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${escapeXml(origin + route)}</loc></url>`).join('')}</urlset>\n`)
}
await writeFile(path.join(root, 'frontend/dist/robots.txt'), robots.join('\n') + '\n')
