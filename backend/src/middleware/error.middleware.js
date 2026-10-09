import { env } from '../config/env.js'
import { HTTP_STATUS } from '../constants/app.constants.js'
import { errorResponse } from '../utils/apiResponse.js'

export const globalErrorHandler = (error, _req, res, _next) => {
  if (res.headersSent) return _next(error)
  const requestedStatus = error.statusCode || error.status
  const statusCode = Number.isInteger(requestedStatus) && requestedStatus >= 400 && requestedStatus <= 599 ? requestedStatus : HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message =
    statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR && env.isProduction
      ? 'Internal server error'
      : error.message

  if (statusCode >= 500) console.error('Request failed:', error.name || 'Error')

  res.status(statusCode).json(
    errorResponse({
      message,
      details: env.isProduction ? null : error.details || error.stack,
    }),
  )
}
