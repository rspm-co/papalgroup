import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { protect } from '../../middleware/auth.middleware.js'
import { login, logout, profile, changePassword } from './auth.controller.js'
import { handleValidationErrors, validateLogin, validatePasswordChange } from './auth.validation.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 10,
  standardHeaders: 'draft-8', legacyHeaders: false, skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
})

router.post('/login', loginLimiter, validateLogin, handleValidationErrors, login)
router.get('/profile', protect, profile)
router.put('/password', protect, loginLimiter, validatePasswordChange, handleValidationErrors, changePassword)
router.post('/logout', protect, logout)

export default router
