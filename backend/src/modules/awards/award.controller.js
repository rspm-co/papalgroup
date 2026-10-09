import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createAward,
  getAdminAwards,
  getPublicAwardBySlug,
  getPublicAwards,
  softDeleteAwardById,
  updateAwardById,
} from './award.service.js'

export const listPublicAwards = async (req, res, next) => {
  try {
    const awards = await getPublicAwards(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Awards fetched successfully',
        data: awards,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getPublicAward = async (req, res, next) => {
  try {
    const award = await getPublicAwardBySlug(req.params.slug)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Award fetched successfully',
        data: { award },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listAdminAwards = async (req, res, next) => {
  try {
    const awards = await getAdminAwards(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Awards fetched successfully',
        data: awards,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createAwardContent = async (req, res, next) => {
  try {
    const award = await createAward(req.body, req.user.id)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Award created successfully',
        data: { award },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateAwardContent = async (req, res, next) => {
  try {
    const award = await updateAwardById(req.params.id, req.body, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Award updated successfully',
        data: { award },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteAwardContent = async (req, res, next) => {
  try {
    const award = await softDeleteAwardById(req.params.id, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Award archived successfully',
        data: { award },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
