import { Router } from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
  createSettingsContent,
  deleteSettingsContent,
  getSettings,
  getSettingsForAdmin,
  updateSettingsContent,
} from './settings.controller.js'
import {
  handleSettingsValidationErrors,
  validateSettingsId,
  validateSettingsPayload,
} from './settings.validation.js'

const publicSettingsRoutes = Router()
const adminSettingsRoutes = Router()

publicSettingsRoutes.get('/', getSettings)

adminSettingsRoutes.use(protect)

adminSettingsRoutes.get('/', getSettingsForAdmin)

adminSettingsRoutes.post(
  '/',
  validateSettingsPayload,
  handleSettingsValidationErrors,
  createSettingsContent,
)

adminSettingsRoutes.put(
  '/:id',
  validateSettingsId,
  validateSettingsPayload,
  handleSettingsValidationErrors,
  updateSettingsContent,
)

adminSettingsRoutes.delete('/:id', deleteSettingsContent)

export { adminSettingsRoutes }
export default publicSettingsRoutes
