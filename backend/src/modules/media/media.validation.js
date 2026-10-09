import { body, param, query, validationResult } from 'express-validator'
import { isRecordId } from '../../database/repository.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import { MEDIA_FOLDERS } from './media.model.js'

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
]

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_MULTIPLE_UPLOAD_COUNT = 20

export const validateMediaId = [
  param('id').custom((value) => {
    if (!isRecordId(value)) {
      throw new Error('Invalid media id')
    }

    return true
  }),
]

export const validateUploadMetadata = [
  body('folder')
    .optional({ checkFalsy: true })
    .isIn(Object.values(MEDIA_FOLDERS))
    .withMessage('Invalid media folder'),
  body('alt').optional({ checkFalsy: true }).trim(),
  body('tags').optional(),
]

export const validateMediaUpdate = [
  body('folder')
    .optional({ checkFalsy: true })
    .isIn(Object.values(MEDIA_FOLDERS))
    .withMessage('Invalid media folder'),
  body('alt').optional({ checkFalsy: true }).trim(),
  body('tags').optional(),
]

export const validateMediaFilters = [
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
  query('folder')
    .optional({ checkFalsy: true })
    .isIn(Object.values(MEDIA_FOLDERS))
    .withMessage('Invalid media folder'),
  query('tags').optional({ checkFalsy: true }).trim(),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn(['newest', 'oldest', 'fileName', 'size'])
    .withMessage('Invalid sort option'),
]

export const handleMediaValidationErrors = (req, _res, next) => {
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
