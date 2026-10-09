import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import { getDashboardOverview } from './dashboard.controller.js'

const router = Router()

// Dashboard metrics are restricted to authenticated admin users.
router.use(protect)
router.get('/', getDashboardOverview)

export default router
