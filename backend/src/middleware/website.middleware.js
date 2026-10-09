import express from 'express'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../../../', import.meta.url))
const publicPages = new Set(['/', '/about', '/brands', '/gallery', '/awards', '/careers', '/contact', '/franchise-enquiry'])
const adminPages = new Set(['/', '/login', '/dashboard', '/leads', '/profile'])

export const mountWebsite = (app) => {
  for (const [prefix, directory, pages] of [['/admin', 'admin', adminPages], ['/', 'frontend', publicPages]]) {
    const dist = path.join(projectRoot, directory, 'dist')
    const index = path.join(dist, 'index.html')
    if (!existsSync(index)) throw new Error(`${directory}/dist/index.html is missing. Run npm run build before starting with SERVE_STATIC=true.`)
    const router = express.Router()
    if (prefix === '/admin') router.use((_req, res, next) => { res.set('X-Robots-Tag', 'noindex, nofollow'); next() })
    router.use(express.static(dist, {
      index: false, dotfiles: 'deny',
      setHeaders: (res, file) => {
        const relativePath = path.relative(dist, file)
        res.set('Cache-Control', relativePath.startsWith(`assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache')
      },
    }))
    router.get('/{*page}', (req, res, next) => {
      if (path.extname(req.path) || req.path.split('/').some(segment => segment.startsWith('.'))) return next()
      res.set('Cache-Control', 'no-store')
      res.status(pages.has(req.path.replace(/\/$/, '') || '/') ? 200 : 404).sendFile(index)
    })
    app.use(prefix, router)
  }
}
