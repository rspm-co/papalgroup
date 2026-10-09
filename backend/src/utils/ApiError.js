import { HTTP_STATUS } from '../constants/app.constants.js'

class ApiError extends Error {
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'Internal server error',
    details = null,
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
