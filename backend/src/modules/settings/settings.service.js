import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Settings from './settings.model.js'

const normalizeKeywords = (keywords) => {
  if (!keywords) {
    return []
  }

  return Array.isArray(keywords)
    ? keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
    : String(keywords)
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
}

const normalizePayload = (payload) => ({
  ...payload,
  seo: {
    ...payload.seo,
    defaultKeywords: normalizeKeywords(payload.seo?.defaultKeywords),
  },
})

export const getPublicSettings = async () => {
  const settings = await Settings.findOne()

  if (!settings) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Website settings not found')
  }

  return settings
}

export const getAdminSettings = async () => {
  const settings = await Settings.findOne()

  if (!settings) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Website settings not found')
  }

  return settings
}

export const createSettings = async (payload) => {
  const existingSettings = await Settings.exists({})

  if (existingSettings) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Website settings already exist',
    )
  }

  return Settings.create(normalizePayload(payload))
}

export const updateSettingsById = async (id, payload) => {
  const settings = await Settings.updateById(
    id,
    normalizePayload(payload),
  )

  if (!settings) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Website settings not found')
  }

  return settings
}

export const rejectSettingsDelete = async () => {
  throw new ApiError(
    HTTP_STATUS.FORBIDDEN,
    'Website settings cannot be deleted',
  )
}
