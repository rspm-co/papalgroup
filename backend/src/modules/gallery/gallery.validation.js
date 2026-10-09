import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { GALLERY_CATEGORIES, GALLERY_STATUS } from './gallery.model.js'

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

const optionalString = (field) => body(field).optional({ checkFalsy: true }).trim()

const objectId = (field, label) =>
  body(field).custom((value) => {
    if (!isRecordId(value)) {
      throw new Error(`${label} must be a valid media id`)
    }

    return true
  })

export const validateGalleryId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid gallery id')
    }

    return true
  }),
]

export const validateGallerySlug = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
]

export const validateGalleryFilters = [
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
    .isIn(Object.values(GALLERY_CATEGORIES))
    .withMessage('Invalid gallery category'),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(Object.values(GALLERY_STATUS))
    .withMessage('Invalid gallery status'),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['displayOrder', 'newest', 'oldest', 'eventDate'])
    .withMessage('Invalid sort option'),
]

export const validateGalleryPayload = [
  requiredString('title', 'Title'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
  requiredString('description', 'Description'),
  body('category')
    .isIn(Object.values(GALLERY_CATEGORIES))
    .withMessage('Invalid gallery category'),
  body('media')
    .isArray({ min: 1 })
    .withMessage('At least one media reference is required'),
  objectId('media.*', 'Media'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean')
    .toBoolean(),
  body('status')
    .optional()
    .isIn(Object.values(GALLERY_STATUS))
    .withMessage('Invalid gallery status'),
  body('displayOrder')
    .isInt({ min: 0 })
    .withMessage('Display order must be a number greater than or equal to 0')
    .toInt(),
  body('eventDate')
    .isISO8601()
    .withMessage('Event date must be a valid date')
    .toDate(),
  optionalString('location'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional({ checkFalsy: true }).trim(),
  optionalString('seo.metaTitle'),
  optionalString('seo.metaDescription'),
  body('seo.keywords').optional().isArray().withMessage('SEO keywords must be an array'),
  body('seo.keywords.*').optional({ checkFalsy: true }).trim(),
  optionalString('seo.ogImage'),
]

export const handleGalleryValidationErrors = (req, _res, next) => {
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
