import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createAwardContent,
  deleteAwardContent,
  getPublicAward,
  listAdminAwards,
  listPublicAwards,
  updateAwardContent,
} from './award.controller.js'
import {
  handleAwardValidationErrors,
  validateAwardFilters,
  validateAwardId,
  validateAwardPayload,
  validateAwardSlug,
} from './award.validation.js'

const publicAwardRoutes = Router()
const adminAwardRoutes = Router()

publicAwardRoutes.get(
  '/',
  validateAwardFilters,
  handleAwardValidationErrors,
  listPublicAwards,
)

publicAwardRoutes.get(
  '/:slug',
  validateAwardSlug,
  handleAwardValidationErrors,
  getPublicAward,
)

adminAwardRoutes.use(protect)

adminAwardRoutes.get(
  '/',
  validateAwardFilters,
  handleAwardValidationErrors,
  listAdminAwards,
)

adminAwardRoutes.post(
  '/',
  validateAwardPayload,
  handleAwardValidationErrors,
  createAwardContent,
)

adminAwardRoutes.put(
  '/:id',
  validateAwardId,
  validateAwardPayload,
  handleAwardValidationErrors,
  updateAwardContent,
)

adminAwardRoutes.delete(
  '/:id',
  validateAwardId,
  handleAwardValidationErrors,
  deleteAwardContent,
)

export { adminAwardRoutes }
export default publicAwardRoutes
