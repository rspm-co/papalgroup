import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createBrandContent,
  deleteBrandContent,
  getPublicBrand,
  listAdminBrands,
  listPublicBrands,
  updateBrandContent,
} from './brand.controller.js'
import {
  handleBrandValidationErrors,
  validateBrandFilters,
  validateBrandId,
  validateBrandPayload,
  validateBrandSlug,
} from './brand.validation.js'

const publicBrandRoutes = Router()
const adminBrandRoutes = Router()

publicBrandRoutes.get(
  '/',
  validateBrandFilters,
  handleBrandValidationErrors,
  listPublicBrands,
)
publicBrandRoutes.get(
  '/:slug',
  validateBrandSlug,
  handleBrandValidationErrors,
  getPublicBrand,
)

adminBrandRoutes.use(protect)

adminBrandRoutes.get(
  '/',
  validateBrandFilters,
  handleBrandValidationErrors,
  listAdminBrands,
)
adminBrandRoutes.post(
  '/',
  validateBrandPayload,
  handleBrandValidationErrors,
  createBrandContent,
)
adminBrandRoutes.put(
  '/:id',
  validateBrandId,
  validateBrandPayload,
  handleBrandValidationErrors,
  updateBrandContent,
)
adminBrandRoutes.delete(
  '/:id',
  validateBrandId,
  handleBrandValidationErrors,
  deleteBrandContent,
)

export { adminBrandRoutes }
export default publicBrandRoutes
