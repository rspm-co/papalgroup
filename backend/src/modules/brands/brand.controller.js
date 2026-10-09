import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createBrand,
  getAdminBrands,
  getPublicBrandBySlug,
  getPublicBrands,
  softDeleteBrandById,
  updateBrandById,
} from './brand.service.js'

export const listPublicBrands = async (req, res, next) => {
  try {
    const brands = await getPublicBrands(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Brands fetched successfully',
        data: { brands },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getPublicBrand = async (req, res, next) => {
  try {
    const brand = await getPublicBrandBySlug(req.params.slug)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Brand fetched successfully',
        data: { brand },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listAdminBrands = async (req, res, next) => {
  try {
    const brands = await getAdminBrands(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Brands fetched successfully',
        data: { brands },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createBrandContent = async (req, res, next) => {
  try {
    const brand = await createBrand(req.body, req.user.id)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Brand created successfully',
        data: { brand },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateBrandContent = async (req, res, next) => {
  try {
    const brand = await updateBrandById(req.params.id, req.body, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Brand updated successfully',
        data: { brand },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteBrandContent = async (req, res, next) => {
  try {
    const brand = await softDeleteBrandById(req.params.id, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Brand deleted successfully',
        data: { brand },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
