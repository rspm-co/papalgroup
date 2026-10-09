import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createCareer,
  getAdminCareers,
  getPublicCareerBySlug,
  getPublicCareers,
  softDeleteCareerById,
  updateCareerById,
} from './career.service.js'

export const listPublicCareers = async (req, res, next) => {
  try {
    const careers = await getPublicCareers(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Careers fetched successfully',
        data: careers,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getPublicCareer = async (req, res, next) => {
  try {
    const career = await getPublicCareerBySlug(req.params.slug)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Career fetched successfully',
        data: { career },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listAdminCareers = async (req, res, next) => {
  try {
    const careers = await getAdminCareers(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Careers fetched successfully',
        data: careers,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createCareerContent = async (req, res, next) => {
  try {
    const career = await createCareer(req.body, req.user.id)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Career created successfully',
        data: { career },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateCareerContent = async (req, res, next) => {
  try {
    const career = await updateCareerById(req.params.id, req.body, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Career updated successfully',
        data: { career },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteCareerContent = async (req, res, next) => {
  try {
    const career = await softDeleteCareerById(req.params.id, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Career archived successfully',
        data: { career },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
