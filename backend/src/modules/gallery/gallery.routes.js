import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createGalleryContent,
  deleteGalleryContent,
  getPublicGalleryItem,
  listAdminGallery,
  listPublicGallery,
  updateGalleryContent,
} from './gallery.controller.js'
import {
  handleGalleryValidationErrors,
  validateGalleryFilters,
  validateGalleryId,
  validateGalleryPayload,
  validateGallerySlug,
} from './gallery.validation.js'

const publicGalleryRoutes = Router()
const adminGalleryRoutes = Router()

publicGalleryRoutes.get(
  '/',
  validateGalleryFilters,
  handleGalleryValidationErrors,
  listPublicGallery,
)

publicGalleryRoutes.get(
  '/:slug',
  validateGallerySlug,
  handleGalleryValidationErrors,
  getPublicGalleryItem,
)

adminGalleryRoutes.use(protect)

adminGalleryRoutes.get(
  '/',
  validateGalleryFilters,
  handleGalleryValidationErrors,
  listAdminGallery,
)

adminGalleryRoutes.post(
  '/',
  validateGalleryPayload,
  handleGalleryValidationErrors,
  createGalleryContent,
)

adminGalleryRoutes.put(
  '/:id',
  validateGalleryId,
  validateGalleryPayload,
  handleGalleryValidationErrors,
  updateGalleryContent,
)

adminGalleryRoutes.delete(
  '/:id',
  validateGalleryId,
  handleGalleryValidationErrors,
  deleteGalleryContent,
)

export { adminGalleryRoutes }
export default publicGalleryRoutes
