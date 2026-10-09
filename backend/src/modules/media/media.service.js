import { v2 as cloudinary } from 'cloudinary'
import path from 'node:path'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { env } from '../../config/env.js'
import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Media, { MEDIA_FOLDERS } from './media.model.js'

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure: true,
})

const normalizeTags = (tags) => {
  if (!tags) {
    return []
  }

  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean)
  }

  return String(tags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

const getCloudinaryFolder = (folder) => {
  return `rspapalgroup/${folder || MEDIA_FOLDERS.GENERAL}`.toLowerCase()
}

const assertCloudinaryConfigured = () => {
  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      'Cloudinary is not configured',
    )
  }
}

const isCloudinaryConfigured = () =>
  Boolean(env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret)

const localUploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../uploads',
)

const uploadBufferLocally = async (file) => {
  await mkdir(localUploadsDirectory, { recursive: true })
  const extension = path.extname(file.originalname).toLowerCase() || '.img'
  const fileName = `${randomUUID()}${extension}`
  await writeFile(path.join(localUploadsDirectory, fileName), file.buffer)

  const url = `${env.publicUrl.replace(/\/$/, '')}/uploads/${fileName}`
  return {
    public_id: `local/${fileName}`,
    url,
    secure_url: url,
    original_filename: path.basename(file.originalname, extension),
    width: 0,
    height: 0,
  }
}

const uploadBufferToCloudinary = async (file, metadata) => {
  if (!isCloudinaryConfigured()) {
    if (env.isProduction) throw new ApiError(503, 'Configure Cloudinary before uploading production media')
    return uploadBufferLocally(file)
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: getCloudinaryFolder(metadata.folder),
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        tags: normalizeTags(metadata.tags),
      },
      (error, result) => {
        if (error) {
          reject(
            new ApiError(
              HTTP_STATUS.INTERNAL_SERVER_ERROR,
              'Cloudinary upload failed',
              error.message,
            ),
          )
          return
        }

        resolve(result)
      },
    )

    uploadStream.end(file.buffer)
  })
}

const buildMediaFilters = ({ search, folder, tags } = {}) => {
  const filters = {}

  if (folder) {
    filters.folder = folder
  }

  if (tags) {
    filters.tags = { in: normalizeTags(tags) }
  }

  if (search) {
    filters.or = [
      { fileName: { contains: search } },
      { originalName: { contains: search } },
      { alt: { contains: search } },
      { tags: { contains: search } },
    ]
  }

  return filters
}

const getSortOptions = (sort = 'newest') => {
  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    fileName: { fileName: 1 },
    size: { size: -1 },
  }

  return sortOptions[sort] || sortOptions.newest
}

const mapUploadedMedia = ({ file, result, metadata, uploadedBy }) => {
  const extension = path.extname(file.originalname).replace('.', '').toLowerCase()

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    originalName: file.originalname,
    fileName: result.original_filename || file.originalname,
    mimeType: file.mimetype,
    extension,
    size: file.size,
    width: result.width || 0,
    height: result.height || 0,
    folder: metadata.folder || MEDIA_FOLDERS.GENERAL,
    alt: metadata.alt || '',
    tags: normalizeTags(metadata.tags),
    uploadedBy,
  }
}

export const uploadMediaFile = async ({ file, metadata, uploadedBy }) => {
  if (!file) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Image file is required')
  }

  const result = await uploadBufferToCloudinary(file, metadata)
  const mediaPayload = mapUploadedMedia({ file, result, metadata, uploadedBy })

  return Media.create(mediaPayload)
}

export const uploadMultipleMediaFiles = async ({ files, metadata, uploadedBy }) => {
  if (!files || files.length === 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'At least one image file is required')
  }

  const uploadedMedia = []

  for (const file of files) {
    const media = await uploadMediaFile({ file, metadata, uploadedBy })
    uploadedMedia.push(media)
  }

  return uploadedMedia
}

export const getMediaLibrary = async (filters = {}) => {
  const page = filters.page || 1
  const limit = filters.limit || 20
  const skip = (page - 1) * limit
  const query = buildMediaFilters(filters)

  const [items, total] = await Promise.all([
    Media.find(query).sort(getSortOptions(filters.sort)).skip(skip).limit(limit),
    Media.count(query),
  ])

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

export const getMediaById = async (id) => {
  const media = await Media.findById(id)

  if (!media) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Media not found')
  }

  return media
}

export const updateMediaById = async (id, payload) => {
  const updatePayload = {}

  if (Object.hasOwn(payload, 'alt')) {
    updatePayload.alt = payload.alt
  }

  if (Object.hasOwn(payload, 'tags')) {
    updatePayload.tags = normalizeTags(payload.tags)
  }

  if (Object.hasOwn(payload, 'folder')) {
    updatePayload.folder = payload.folder
  }

  const media = await Media.updateById(
    id,
    updatePayload,
  )

  if (!media) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Media not found')
  }

  return media
}

export const deleteMediaById = async (id) => {
  const media = await Media.findById(id)

  if (!media) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Media not found')
  }

  if (media.publicId.startsWith('local/')) {
    const fileName = path.basename(media.publicId)
    try {
      await unlink(path.join(localUploadsDirectory, fileName))
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  } else {
    assertCloudinaryConfigured()
    const result = await cloudinary.uploader.destroy(media.publicId, {
      resource_type: 'image',
    })

    if (!['ok', 'not found'].includes(result.result)) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Cloudinary delete failed',
        result,
      )
    }
  }

  await Media.deleteById(id)
  return media
}

