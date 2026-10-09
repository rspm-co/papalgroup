import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createCareerContent,
  deleteCareerContent,
  getPublicCareer,
  listAdminCareers,
  listPublicCareers,
  updateCareerContent,
} from './career.controller.js'
import {
  handleCareerValidationErrors,
  validateCareerFilters,
  validateCareerId,
  validateCareerPayload,
  validateCareerSlug,
} from './career.validation.js'

const publicCareerRoutes = Router()
const adminCareerRoutes = Router()

publicCareerRoutes.get(
  '/',
  validateCareerFilters,
  handleCareerValidationErrors,
  listPublicCareers,
)

publicCareerRoutes.get(
  '/:slug',
  validateCareerSlug,
  handleCareerValidationErrors,
  getPublicCareer,
)

adminCareerRoutes.use(protect)

adminCareerRoutes.get(
  '/',
  validateCareerFilters,
  handleCareerValidationErrors,
  listAdminCareers,
)

adminCareerRoutes.post(
  '/',
  validateCareerPayload,
  handleCareerValidationErrors,
  createCareerContent,
)

adminCareerRoutes.put(
  '/:id',
  validateCareerId,
  validateCareerPayload,
  handleCareerValidationErrors,
  updateCareerContent,
)

adminCareerRoutes.delete(
  '/:id',
  validateCareerId,
  handleCareerValidationErrors,
  deleteCareerContent,
)

export { adminCareerRoutes }
export default publicCareerRoutes
