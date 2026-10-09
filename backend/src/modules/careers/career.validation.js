import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { CAREER_STATUS, EMPLOYMENT_TYPES, WORK_MODES } from './career.model.js'

const requiredString = (field, label) =>
  body(field).trim().notEmpty().withMessage(`${label} is required`)

const optionalString = (field) => body(field).optional({ checkFalsy: true }).trim()

const requiredStringArray = (field, label) =>
  body(field)
    .isArray({ min: 1 })
    .withMessage(`${label} must contain at least one item`)

export const validateCareerId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid career id')
    }

    return true
  }),
]

export const validateCareerSlug = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
]

export const validateCareerFilters = [
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
  query('department').optional({ checkFalsy: true }).trim(),
  query('location').optional({ checkFalsy: true }).trim(),
  query('employmentType')
    .optional({ checkFalsy: true })
    .isIn(Object.values(EMPLOYMENT_TYPES))
    .withMessage('Invalid employment type'),
  query('workMode')
    .optional({ checkFalsy: true })
    .isIn(Object.values(WORK_MODES))
    .withMessage('Invalid work mode'),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(Object.values(CAREER_STATUS))
    .withMessage('Invalid career status'),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['displayOrder', 'newest', 'oldest', 'applicationDeadline'])
    .withMessage('Invalid sort option'),
]

export const validateCareerPayload = [
  requiredString('title', 'Title'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase and URL friendly'),
  requiredString('department', 'Department'),
  requiredString('location', 'Location'),
  body('employmentType')
    .isIn(Object.values(EMPLOYMENT_TYPES))
    .withMessage('Invalid employment type'),
  body('workMode').isIn(Object.values(WORK_MODES)).withMessage('Invalid work mode'),
  requiredString('experience', 'Experience'),
  optionalString('salary'),
  body('vacancies')
    .isInt({ min: 1 })
    .withMessage('Vacancies must be greater than or equal to 1')
    .toInt(),
  requiredString('description', 'Description'),
  requiredStringArray('responsibilities', 'Responsibilities'),
  body('responsibilities.*').trim().notEmpty().withMessage('Responsibility cannot be empty'),
  requiredStringArray('requirements', 'Requirements'),
  body('requirements.*').trim().notEmpty().withMessage('Requirement cannot be empty'),
  requiredStringArray('skills', 'Skills'),
  body('skills.*').trim().notEmpty().withMessage('Skill cannot be empty'),
  body('benefits').optional().isArray().withMessage('Benefits must be an array'),
  body('benefits.*').optional({ checkFalsy: true }).trim(),
  body('applicationDeadline')
    .isISO8601()
    .withMessage('Application deadline must be a valid date')
    .toDate(),
  body('status')
    .optional()
    .isIn(Object.values(CAREER_STATUS))
    .withMessage('Invalid career status'),
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
]

export const handleCareerValidationErrors = (req, _res, next) => {
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
