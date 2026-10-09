import { body, param, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

const requiredArray = (field, label) =>
  body(field)
    .isArray({ min: 1 })
    .withMessage(`${label} must contain at least one item`)

const displayOrder = (field, label) =>
  body(field)
    .isInt({ min: 0 })
    .withMessage(`${label} must be a number greater than or equal to 0`)
    .toInt()

export const validateHomepageId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid homepage document id')
    }

    return true
  }),
]

export const validateHomepagePayload = [
  requiredString('hero.title', 'Hero title'),
  requiredString('hero.subtitle', 'Hero subtitle'),
  requiredString('hero.description', 'Hero description'),
  requiredString('hero.primaryButtonText', 'Hero primary button text'),
  requiredString('hero.primaryButtonLink', 'Hero primary button link'),
  requiredString('hero.secondaryButtonText', 'Hero secondary button text'),
  requiredString('hero.secondaryButtonLink', 'Hero secondary button link'),
  requiredString('hero.backgroundImage', 'Hero background image'),
  body('hero.isActive')
    .isBoolean()
    .withMessage('Hero active status must be a boolean')
    .toBoolean(),

  requiredArray('journey', 'Journey'),
  requiredString('journey.*.year', 'Journey year'),
  requiredString('journey.*.title', 'Journey title'),
  requiredString('journey.*.description', 'Journey description'),
  requiredString('journey.*.image', 'Journey image'),
  displayOrder('journey.*.displayOrder', 'Journey display order'),

  requiredArray('achievements', 'Achievements'),
  requiredString('achievements.*.title', 'Achievement title'),
  requiredString('achievements.*.value', 'Achievement value'),
  requiredString('achievements.*.suffix', 'Achievement suffix'),
  requiredString('achievements.*.icon', 'Achievement icon'),
  displayOrder('achievements.*.displayOrder', 'Achievement display order'),

  requiredString('cta.title', 'CTA title'),
  requiredString('cta.description', 'CTA description'),
  requiredString('cta.primaryButton.text', 'CTA primary button text'),
  requiredString('cta.primaryButton.link', 'CTA primary button link'),
  requiredString('cta.secondaryButton.text', 'CTA secondary button text'),
  requiredString('cta.secondaryButton.link', 'CTA secondary button link'),
  requiredString('cta.backgroundImage', 'CTA background image'),
]

export const handleHomepageValidationErrors = (req, _res, next) => {
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
