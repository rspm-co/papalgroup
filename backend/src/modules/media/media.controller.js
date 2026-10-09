import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  deleteMediaById,
  getMediaById,
  getMediaLibrary,
  updateMediaById,
  uploadMediaFile,
  uploadMultipleMediaFiles,
} from './media.service.js'

export const uploadMedia = async (req, res, next) => {
  try {
    const media = await uploadMediaFile({
      file: req.file,
      metadata: req.body,
      uploadedBy: req.user.id,
    })

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Media uploaded successfully',
        data: { media },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const uploadMultipleMedia = async (req, res, next) => {
  try {
    const media = await uploadMultipleMediaFiles({
      files: req.files,
      metadata: req.body,
      uploadedBy: req.user.id,
    })

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Media uploaded successfully',
        data: { media },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listMedia = async (req, res, next) => {
  try {
    const media = await getMediaLibrary(req.query)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Media fetched successfully',
        data: media,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getMedia = async (req, res, next) => {
  try {
    const media = await getMediaById(req.params.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Media fetched successfully',
        data: { media },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateMedia = async (req, res, next) => {
  try {
    const media = await updateMediaById(req.params.id, req.body)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Media updated successfully',
        data: { media },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await deleteMediaById(req.params.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Media deleted successfully',
        data: { media },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
