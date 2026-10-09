import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { LEAD_PRIORITY, LEAD_STATUS, LEAD_TYPES } from './lead.model.js'

const optionalString = (field) => body(field).optional({ checkFalsy: true }).isString().isLength({ max: 1000 }).trim()

const requiredString = (field, label) =>
  body(field).isString().isLength({ max: field === 'message' ? 5000 : 200 }).trim().notEmpty().withMessage(`${label} is required`)

const optionalRecordId = (field, label) =>
  body(field)
    .optional()
    .custom((value) => {
      if (value === null || value === '') return true
      if (!isRecordId(value)) {
        throw new Error(`${label} must be a valid id`)
      }

      return true
    })
    .customSanitizer(value => value || null)

export const validateLeadId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid lead id')
    }

    return true
  }),
]

export const validateCreateLead = [
  body('leadType')
    .isIn(Object.values(LEAD_TYPES))
    .withMessage('Invalid lead type'),
  requiredString('fullName', 'Full name'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .isLength({ max: 254 })
    .toLowerCase(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9+\-\s()]{8,16}$/)
    .withMessage('Enter a valid phone number'),
  optionalString('addressLine1'),
  optionalString('addressLine2'),
  optionalString('company'),
  optionalString('city'),
  optionalString('state'),
  optionalString('country'),
  optionalString('preferredBrand'),
  optionalString('investmentRange'),
  optionalString('businessExperience'),
  requiredString('subject', 'Subject'),
  requiredString('message', 'Message'),
  optionalString('source'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array'),
  optionalRecordId('attachments.*.media', 'Attachment media'),
  body('attachments.*.url').optional({ checkFalsy: true }).trim(),
  body('attachments.*.label').optional({ checkFalsy: true }).trim(),
]

export const validateLeadFilters = [
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
  query('search').optional({ checkFalsy: true }).isString().isLength({ max: 200 }).trim(),
  query('preferredBrand').optional({ checkFalsy: true }).isString().isLength({ max: 200 }).trim(),
  query('assignedTo').optional({ checkFalsy: true }).custom(isRecordId),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(Object.values(LEAD_STATUS))
    .withMessage('Invalid lead status'),
  query('leadType')
    .optional({ checkFalsy: true })
    .isIn(Object.values(LEAD_TYPES))
    .withMessage('Invalid lead type'),
  query('priority')
    .optional({ checkFalsy: true })
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage('Invalid lead priority'),
  query('fromDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('From date must be a valid date')
    .toDate(),
  query('toDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('To date must be a valid date')
    .toDate(),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['newest', 'oldest', 'priority', 'followUpDate'])
    .withMessage('Invalid sort option'),
]

export const validateUpdateLead = [
  body('status')
    .optional()
    .isIn(Object.values(LEAD_STATUS))
    .withMessage('Invalid lead status'),
  body('priority')
    .optional()
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage('Invalid lead priority'),
  optionalRecordId('assignedTo', 'Assigned user'),
  body('note').optional({ checkFalsy: true }).isString().isLength({ max: 5000 }).trim(),
  body('followUpDate')
    .optional()
    .custom(value => value === null || value === '' || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) && Number.isFinite(Date.parse(value))))
    .withMessage('Follow-up date must be a valid date')
    .customSanitizer(value => value ? new Date(value) : null),
]

export const handleLeadValidationErrors = (req, _res, next) => {
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
