import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Media from '../media/media.model.js'
import Gallery, { GALLERY_STATUS } from './gallery.model.js'

const normalizeTags = (tags) => {
  if (!tags) {
    return []
  }

  return Array.isArray(tags)
    ? tags.map((tag) => String(tag).trim()).filter(Boolean)
    : String(tags)
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
}

const normalizePayload = (payload) => ({
  ...payload,
  slug: payload.slug?.toLowerCase(),
  tags: normalizeTags(payload.tags),
})

const buildGalleryFilters = (filters = {}, publicOnly = false) => {
  const query = {}

  if (publicOnly) {
    query.status = GALLERY_STATUS.PUBLISHED
  } else if (filters.status) {
    query.status = filters.status
  }

  if (filters.category) {
    query.category = filters.category
  }

  if (filters.search) {
    query.or = [
      { title: { contains: filters.search } },
      { category: { contains: filters.search } },
      { tags: { contains: filters.search } },
    ]
  }

  return query
}

const getSortOptions = (sort = 'displayOrder') => {
  const sortOptions = {
    displayOrder: { displayOrder: 1, eventDate: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    eventDate: { eventDate: -1 },
  }

  return sortOptions[sort] || sortOptions.displayOrder
}

const paginate = async ({ query, filters, populate = true }) => {
  const page = filters.page || 1
  const limit = filters.limit || 20
  const skip = (page - 1) * limit

  const findQuery = Gallery.find(query).sort(getSortOptions(filters.sort)).skip(skip).limit(limit)

  if (populate) {
    findQuery.withRelations('media')
  }

  const [items, total] = await Promise.all([
    findQuery,
    Gallery.count(query),
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

const ensureUniqueSlug = async (slug, excludedId = null) => {
  const query = { slug }

  if (excludedId) {
    query._id = { ne: excludedId }
  }

  const existingGallery = await Gallery.exists(query)

  if (existingGallery) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Gallery slug already exists')
  }
}

const ensureMediaExists = async (mediaIds) => {
  const uniqueMediaIds = [...new Set(mediaIds.map((id) => id.toString()))]
  const existingCount = await Media.count({ _id: { in: uniqueMediaIds } })

  if (existingCount !== uniqueMediaIds.length) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'One or more media references are invalid')
  }
}

export const getPublicGalleryItems = async (filters) => {
  return paginate({
    query: buildGalleryFilters(filters, true),
    filters,
  })
}

export const getPublicGalleryBySlug = async (slug) => {
  const gallery = await Gallery.findOne({
    slug,
    status: GALLERY_STATUS.PUBLISHED,
  }).withRelations('media')

  if (!gallery) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Gallery item not found')
  }

  return gallery
}

export const getAdminGalleryItems = async (filters) => {
  return paginate({
    query: buildGalleryFilters(filters),
    filters,
  })
}

export const createGalleryItem = async (payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug)
  await ensureMediaExists(normalizedPayload.media)

  return Gallery.create({
    ...normalizedPayload,
    createdBy: adminId,
    updatedBy: adminId,
  })
}

export const updateGalleryItemById = async (id, payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug, id)
  await ensureMediaExists(normalizedPayload.media)

  const gallery = await Gallery.updateById(
    id,
    {
      ...normalizedPayload,
      updatedBy: adminId,
    },
  ).withRelations('media')

  if (!gallery) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Gallery item not found')
  }

  return gallery
}

export const softDeleteGalleryItemById = async (id, adminId) => {
  const gallery = await Gallery.updateById(
    id,
    {
      status: GALLERY_STATUS.ARCHIVED,
      updatedBy: adminId,
    },
  ).withRelations('media')

  if (!gallery) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Gallery item not found')
  }

  return gallery
}

