import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import AuthUser from './auth.model.js'

const PASSWORD_SALT_ROUNDS = 12

const toSafeUser = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

export const hashPassword = async (password) => {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS)
}

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export const createToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      version: user.tokenVersion || 0,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  )
}

export const loginSuperAdmin = async ({ email, password }) => {
  const user = await AuthUser.findOne({ email: email.toLowerCase().trim() }).includeSecrets(
    '+password +tokenVersion',
  )

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password')
  }

  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Inactive account')
  }

  const isPasswordValid = await verifyPassword(password, user.password)

  if (!isPasswordValid) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password')
  }

  return {
    token: createToken(user),
    user: toSafeUser(user),
  }
}

export const getProfileById = async (userId, tokenVersion) => {
  const user = await AuthUser.findById(userId).includeSecrets('+tokenVersion')

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
  }

  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Inactive account')
  }

  if (tokenVersion !== undefined && (user.tokenVersion || 0) !== tokenVersion) throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired')

  return toSafeUser(user)
}

export const verifyAuthToken = async (token) => {
  try {
    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] })
    if (typeof payload.sub !== 'string' || !/^[a-f\d]{24}$/i.test(payload.sub)) throw new Error('Invalid token subject')
    return payload
  } catch {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
  }
}

export const revokeUserTokens = (userId) => AuthUser.updateById(userId, user => ({ tokenVersion: user.tokenVersion + 1 }))

export const changeAdminPassword = async (userId, { currentPassword, newPassword }) => {
  const user = await AuthUser.updateById(userId, async current => {
    if (!current.isActive || !await verifyPassword(currentPassword, current.password)) throw new ApiError(400, 'Current password is incorrect')
    return { password: await hashPassword(newPassword), tokenVersion: current.tokenVersion + 1 }
  }).includeSecrets('tokenVersion')
  if (!user) throw new ApiError(401, 'Unauthorized')
  return { token: createToken(user), user: toSafeUser(user) }
}
