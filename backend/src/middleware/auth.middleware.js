import { HTTP_STATUS } from '../constants/app.constants.js'
import ApiError from '../utils/ApiError.js'
import { getProfileById, verifyAuthToken } from '../modules/auth/auth.service.js'

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null
  }

  return authorizationHeader.split(' ')[1]
}

export const protect = async (req, _res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization)

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
    }

    const payload = await verifyAuthToken(token)
    const user = await getProfileById(payload.sub, payload.version ?? 0)

    req.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}
