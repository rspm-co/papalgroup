import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { AWARD_CATEGORIES, AWARD_STATUS } from './award.model.js'

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

const optionalString = (field) => body(field).optional({ checkFalsy: true }).trim()

const optionalRecordId = (field, label) =>
  body(field)
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!isRecordId(value)) {
        throw new Error(`${label} must be a valid id`)
      }

      return true
    })

export const validateAwardId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid award id')
    }

    return true
  }),
]

export const validateAwardSlug = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
]

export const validateAwardFilters = [
  query('page')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 1')
    .toInt(),
  query('limit')
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  query('search').optional({ checkFalsy: true }).trim(),
  query('category')
    .optional({ checkFalsy: true })
    .isIn(Object.values(AWARD_CATEGORIES))
    .withMessage('Invalid award category'),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(Object.values(AWARD_STATUS))
    .withMessage('Invalid award status'),
  query('featured')
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage('Featured must be a boolean')
    .toBoolean(),
  query('brand')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!isRecordId(value)) {
        throw new Error('Brand must be a valid id')
      }

      return true
    }),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['displayOrder', 'newest', 'oldest', 'awardDate'])
    .withMessage('Invalid sort option'),
]

export const validateAwardPayload = [
  requiredString('title', 'Title'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
  requiredString('organization', 'Organization'),
  body('awardDate')
    .isISO8601()
    .withMessage('Award date must be a valid date')
    .toDate(),
  requiredString('year', 'Year'),
  requiredString('description', 'Description'),
  optionalRecordId('certificateMedia', 'Certificate media'),
  optionalRecordId('coverMedia', 'Cover media'),
  body('galleryMedia')
    .optional()
    .isArray()
    .withMessage('Gallery media must be an array'),
  body('galleryMedia.*').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Gallery media must contain valid media ids')
    }

    return true
  }),
  optionalRecordId('brand', 'Brand'),
  body('category')
    .isIn(Object.values(AWARD_CATEGORIES))
    .withMessage('Invalid award category'),
  body('status')
    .optional()
    .isIn(Object.values(AWARD_STATUS))
    .withMessage('Invalid award status'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean')
    .toBoolean(),
  body('displayOrder')
    .isInt({ min: 0 })
    .withMessage('Display order must be a number greater than or equal to 0')
    .toInt(),
  optionalString('seo.metaTitle'),
  optionalString('seo.metaDescription'),
  body('seo.keywords').optional().isArray().withMessage('SEO keywords must be an array'),
  body('seo.keywords.*').optional({ checkFalsy: true }).trim(),
  optionalString('seo.ogImage'),
]

export const handleAwardValidationErrors = (req, _res, next) => {
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
