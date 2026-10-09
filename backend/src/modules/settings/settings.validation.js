import { body, param, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'

const phonePattern = /^[0-9+\-\s()]{8,16}$/

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

const optionalString = (field) => body(field).optional({ checkFalsy: true }).trim()

const optionalUrl = (field, label) =>
  body(field)
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: true })
    .withMessage(`${label} must be a valid URL`)

export const validateSettingsId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid settings id')
    }

    return true
  }),
]

export const validateSettingsPayload = [
  requiredString('companyName', 'Company name'),
  requiredString('tagline', 'Tagline'),
  optionalUrl('logo', 'Logo'),
  optionalUrl('favicon', 'Favicon'),
  optionalString('primaryBrandColor'),
  optionalString('secondaryBrandColor'),
  body('primaryEmail')
    .trim()
    .notEmpty()
    .withMessage('Primary email is required')
    .isEmail()
    .withMessage('Enter a valid primary email')
    .normalizeEmail(),
  body('supportEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Enter a valid support email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(phonePattern)
    .withMessage('Enter a valid phone number'),
  body('whatsapp')
    .optional({ checkFalsy: true })
    .trim()
    .matches(phonePattern)
    .withMessage('Enter a valid WhatsApp number'),
  optionalUrl('website', 'Website'),
  requiredString('address', 'Address'),
  requiredString('city', 'City'),
  requiredString('state', 'State'),
  requiredString('country', 'Country'),
  optionalString('postalCode'),
  optionalString('googleMapsEmbed'),
  optionalString('businessHours.monday'),
  optionalString('businessHours.tuesday'),
  optionalString('businessHours.wednesday'),
  optionalString('businessHours.thursday'),
  optionalString('businessHours.friday'),
  optionalString('businessHours.saturday'),
  optionalString('businessHours.sunday'),
  optionalUrl('socialLinks.facebook', 'Facebook URL'),
  optionalUrl('socialLinks.instagram', 'Instagram URL'),
  optionalUrl('socialLinks.linkedin', 'LinkedIn URL'),
  optionalUrl('socialLinks.youtube', 'YouTube URL'),
  optionalUrl('socialLinks.twitter', 'Twitter URL'),
  optionalString('seo.defaultTitle'),
  optionalString('seo.defaultDescription'),
  body('seo.defaultKeywords')
    .optional()
    .isArray()
    .withMessage('Default keywords must be an array'),
  body('seo.defaultKeywords.*').optional({ checkFalsy: true }).trim(),
  optionalUrl('seo.defaultOgImage', 'Default OG image'),
  optionalString('analytics.googleAnalyticsId'),
  optionalString('analytics.googleTagManagerId'),
  optionalString('analytics.metaPixelId'),
  body('maintenanceMode')
    .optional()
    .isBoolean()
    .withMessage('Maintenance mode must be a boolean')
    .toBoolean(),
  optionalString('maintenanceMessage'),
]

export const handleSettingsValidationErrors = (req, _res, next) => {
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
