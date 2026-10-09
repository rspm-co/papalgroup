import { Router } from 'express'
import { HEALTH_ROUTE } from '../constants/app.constants.js'
import { env } from '../config/env.js'
import { databaseReady } from '../config/db.js'
import authRoutes from '../modules/auth/auth.routes.js'
import awardRoutes from '../modules/awards/award.routes.js'
import brandRoutes from '../modules/brands/brand.routes.js'
import careerRoutes from '../modules/careers/career.routes.js'
import dashboardRoutes from '../modules/dashboard/dashboard.routes.js'
import galleryRoutes from '../modules/gallery/gallery.routes.js'
import homepageRoutes from '../modules/homepage/homepage.routes.js'
import leadRoutes, { adminLeadRoutes } from '../modules/leads/lead.routes.js'
import settingsRoutes from '../modules/settings/settings.routes.js'

const router = Router()

router.get(HEALTH_ROUTE, async (_req, res) => {
  const ready = await databaseReady()
  res.set('Cache-Control', 'no-store').status(ready ? 200 : 503).json({
    status: ready ? 'ok' : 'unavailable',
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  })
})

router.get(`${HEALTH_ROUTE}/live`, (_req, res) => res.set('Cache-Control', 'no-store').json({ status: 'ok' }))

router.use('/auth', authRoutes)
router.use('/awards', awardRoutes)
router.use('/brands', brandRoutes)
router.use('/careers', careerRoutes)
router.use('/admin/dashboard', dashboardRoutes)
router.use('/gallery', galleryRoutes)
router.use('/leads', leadRoutes)
router.use('/admin/leads', adminLeadRoutes)
router.use('/settings', settingsRoutes)
router.use('/homepage', homepageRoutes)

export default router
