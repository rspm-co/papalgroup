import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { BRAND_CATEGORIES, BRAND_STATUS } from './brand.model.js'

const optionalUrl = (field, label) =>
  body(field)
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: true })
    .withMessage(`${label} must be a valid URL`)

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

export const validateBrandId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid brand id')
    }

    return true
  }),
]

export const validateBrandSlug = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
]

export const validateBrandFilters = [
  query('name').optional({ checkFalsy: true }).trim(),
  query('category')
    .optional({ checkFalsy: true })
    .isIn(Object.values(BRAND_CATEGORIES))
    .withMessage('Invalid brand category'),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(Object.values(BRAND_STATUS))
    .withMessage('Invalid brand status'),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['displayOrder', 'newest', 'oldest'])
    .withMessage('Invalid sort option'),
]

export const validateBrandPayload = [
  requiredString('name', 'Name'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
  requiredString('tagline', 'Tagline'),
  requiredString('shortDescription', 'Short description'),
  requiredString('fullDescription', 'Full description'),
  body('category')
    .isIn(Object.values(BRAND_CATEGORIES))
    .withMessage('Invalid brand category'),
  optionalUrl('website', 'Website'),
  optionalUrl('logo', 'Logo'),
  optionalUrl('heroImage', 'Hero image'),
  body('gallery').optional().isArray().withMessage('Gallery must be an array'),
  optionalUrl('gallery.*.image', 'Gallery image'),
  body('gallery.*.caption').optional({ checkFalsy: true }).trim(),
  body('themeColor')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Theme color must be a valid hex color'),
  body('status')
    .optional()
    .isIn(Object.values(BRAND_STATUS))
    .withMessage('Invalid brand status'),
  body('displayOrder')
    .isInt({ min: 0 })
    .withMessage('Display order must be a number greater than or equal to 0')
    .toInt(),
  body('seo.metaTitle').optional({ checkFalsy: true }).trim(),
  body('seo.metaDescription').optional({ checkFalsy: true }).trim(),
  body('seo.keywords').optional().isArray().withMessage('SEO keywords must be an array'),
  body('seo.keywords.*').optional({ checkFalsy: true }).trim(),
  optionalUrl('seo.ogImage', 'SEO OG image'),
]

export const handleBrandValidationErrors = (req, _res, next) => {
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
