import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createHomepage,
  deleteHomepageById,
  getAdminHomepage,
  getPublicHomepage,
  updateHomepageById,
} from './homepage.service.js'

export const getHomepage = async (_req, res, next) => {
  try {
    const homepage = await getPublicHomepage()

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Homepage content fetched successfully',
        data: { homepage },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getHomepageForAdmin = async (_req, res, next) => {
  try {
    const homepage = await getAdminHomepage()

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Homepage content fetched successfully',
        data: { homepage },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createHomepageContent = async (req, res, next) => {
  try {
    const homepage = await createHomepage(req.body, req.user.id)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Homepage content created successfully',
        data: { homepage },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateHomepageContent = async (req, res, next) => {
  try {
    const homepage = await updateHomepageById(req.params.id, req.body, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Homepage content updated successfully',
        data: { homepage },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteHomepageContent = async (req, res, next) => {
  try {
    const homepage = await deleteHomepageById(req.params.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Homepage content deleted successfully',
        data: { homepage },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
