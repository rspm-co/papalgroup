import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createSettings,
  getAdminSettings,
  getPublicSettings,
  rejectSettingsDelete,
  updateSettingsById,
} from './settings.service.js'

export const getSettings = async (_req, res, next) => {
  try {
    const settings = await getPublicSettings()

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Website settings fetched successfully',
        data: { settings },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getSettingsForAdmin = async (_req, res, next) => {
  try {
    const settings = await getAdminSettings()

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Website settings fetched successfully',
        data: { settings },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createSettingsContent = async (req, res, next) => {
  try {
    const settings = await createSettings(req.body)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Website settings created successfully',
        data: { settings },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateSettingsContent = async (req, res, next) => {
  try {
    const settings = await updateSettingsById(req.params.id, req.body)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Website settings updated successfully',
        data: { settings },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteSettingsContent = async (_req, _res, next) => {
  try {
    await rejectSettingsDelete()
  } catch (error) {
    return next(error)
  }
}
