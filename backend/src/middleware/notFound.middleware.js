import { HTTP_STATUS } from '../constants/app.constants.js'
import ApiError from '../utils/ApiError.js'

export const notFoundHandler = (req, _res, next) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route not found: ${req.originalUrl}`))
}
