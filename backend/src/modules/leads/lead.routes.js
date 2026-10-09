import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createLeadContent,
  deleteLeadContent,
  getAdminLead,
  listAdminLeads,
  updateLeadContent,
} from './lead.controller.js'
import {
  handleLeadValidationErrors,
  validateCreateLead,
  validateLeadFilters,
  validateLeadId,
  validateUpdateLead,
} from './lead.validation.js'

const publicLeadRoutes = Router()
const adminLeadRoutes = Router()

const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many lead submissions. Please try again later.',
    details: null,
  },
})

publicLeadRoutes.post(
  '/',
  leadSubmissionLimiter,
  validateCreateLead,
  handleLeadValidationErrors,
  createLeadContent,
)

adminLeadRoutes.use(protect)

adminLeadRoutes.get(
  '/',
  validateLeadFilters,
  handleLeadValidationErrors,
  listAdminLeads,
)

adminLeadRoutes.get(
  '/:id',
  validateLeadId,
  handleLeadValidationErrors,
  getAdminLead,
)

adminLeadRoutes.put(
  '/:id',
  validateLeadId,
  validateUpdateLead,
  handleLeadValidationErrors,
  updateLeadContent,
)

adminLeadRoutes.delete(
  '/:id',
  validateLeadId,
  handleLeadValidationErrors,
  deleteLeadContent,
)

export { adminLeadRoutes }
export default publicLeadRoutes
