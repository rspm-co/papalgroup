import { Router } from 'express'
import multer from 'multer'
import { protect } from '../../middleware/auth.middleware.js'
import ApiError from '../../utils/ApiError.js'
import {
  deleteMedia,
  getMedia,
  listMedia,
  updateMedia,
  uploadMedia,
  uploadMultipleMedia,
} from './media.controller.js'
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_MULTIPLE_UPLOAD_COUNT,
  handleMediaValidationErrors,
  validateMediaFilters,
  validateMediaId,
  validateMediaUpdate,
  validateUploadMetadata,
} from './media.validation.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'

const router = Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES,
    files: MAX_MULTIPLE_UPLOAD_COUNT,
  },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
      callback(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          'Invalid file type. Only PNG, JPEG, WEBP and SVG images are allowed',
        ),
      )
      return
    }

    callback(null, true)
  },
})

const handleMulterError = (handler) => (req, res, next) => {
  handler(req, res, (error) => {
    if (!error) {
      return next()
    }

    if (error instanceof multer.MulterError) {
      const messages = {
        LIMIT_FILE_SIZE: 'Image size must not exceed 10 MB',
        LIMIT_FILE_COUNT: 'A maximum of 20 images can be uploaded at once',
        LIMIT_UNEXPECTED_FILE: 'Unexpected upload field',
      }
      const message = messages[error.code] || error.message

      return next(new ApiError(HTTP_STATUS.BAD_REQUEST, message))
    }

    return next(error)
  })
}

router.use(protect)

router.post(
  '/upload',
  handleMulterError(upload.single('image')),
  validateUploadMetadata,
  handleMediaValidationErrors,
  uploadMedia,
)

router.post(
  '/upload/multiple',
  handleMulterError(upload.array('images', MAX_MULTIPLE_UPLOAD_COUNT)),
  validateUploadMetadata,
  handleMediaValidationErrors,
  uploadMultipleMedia,
)

router.get('/', validateMediaFilters, handleMediaValidationErrors, listMedia)

router.get('/:id', validateMediaId, handleMediaValidationErrors, getMedia)

router.put(
  '/:id',
  validateMediaId,
  validateMediaUpdate,
  handleMediaValidationErrors,
  updateMedia,
)

router.delete('/:id', validateMediaId, handleMediaValidationErrors, deleteMedia)

export default router
