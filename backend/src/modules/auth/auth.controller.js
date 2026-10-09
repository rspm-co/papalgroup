import { successResponse } from '../../utils/apiResponse.js'
import { loginSuperAdmin, revokeUserTokens, changeAdminPassword } from './auth.service.js'

export const login = async (req, res, next) => {
  try {
    const data = await loginSuperAdmin(req.body)

    return res.status(200).json(
      successResponse({
        message: 'Login successful',
        data,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const profile = async (req, res, next) => {
  try {
    return res.status(200).json(
      successResponse({
        message: 'Profile fetched successfully',
        data: {
          user: req.user,
        },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const data = await changeAdminPassword(req.user.id, req.body)
    return res.json(successResponse({ message: 'Password changed. Other sessions have been signed out.', data }))
  } catch (error) { return next(error) }
}

export const logout = async (req, res, next) => {
  try {
    await revokeUserTokens(req.user.id)
    return res.status(200).json(
      successResponse({
        message: 'Logout successful',
      }),
    )
  } catch (error) {
    return next(error)
  }
}
