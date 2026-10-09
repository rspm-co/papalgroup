import { body, validationResult } from 'express-validator'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .isLength({ max: 254 })
    .toLowerCase(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must be at least 8 characters long'),
]

export const validatePasswordChange = [
  body('currentPassword').isString().notEmpty().withMessage('Current password is required'),
  body('newPassword').isString().isLength({ min: 12 }).withMessage('New password must be at least 12 characters')
    .custom(value => Buffer.byteLength(value) <= 72).withMessage('New password must be at most 72 UTF-8 bytes')
    .custom((value, { req }) => value !== req.body.currentPassword).withMessage('Choose a different password'),
]

export const handleValidationErrors = (req, _res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  return next(
    new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Validation failed',
      errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    ),
  )
}
