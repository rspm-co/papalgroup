import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createGalleryItem,
  getAdminGalleryItems,
  getPublicGalleryBySlug,
  getPublicGalleryItems,
  softDeleteGalleryItemById,
  updateGalleryItemById,
} from './gallery.service.js'

export const listPublicGallery = async (req, res, next) => {
  try {
    const gallery = await getPublicGalleryItems(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Gallery fetched successfully',
        data: gallery,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getPublicGalleryItem = async (req, res, next) => {
  try {
    const gallery = await getPublicGalleryBySlug(req.params.slug)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Gallery item fetched successfully',
        data: { gallery },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listAdminGallery = async (req, res, next) => {
  try {
    const gallery = await getAdminGalleryItems(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Gallery fetched successfully',
        data: gallery,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const createGalleryContent = async (req, res, next) => {
  try {
    const gallery = await createGalleryItem(req.body, req.user.id)

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Gallery item created successfully',
        data: { gallery },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateGalleryContent = async (req, res, next) => {
  try {
    const gallery = await updateGalleryItemById(req.params.id, req.body, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Gallery item updated successfully',
        data: { gallery },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteGalleryContent = async (req, res, next) => {
  try {
    const gallery = await softDeleteGalleryItemById(req.params.id, req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Gallery item archived successfully',
        data: { gallery },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
