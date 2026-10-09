import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Brand from '../brands/brand.model.js'
import Media from '../media/media.model.js'
import Award, { AWARD_STATUS } from './award.model.js'

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
  slug: payload.slug?.toLowerCase(),
  galleryMedia: payload.galleryMedia || [],
  seo: {
    ...payload.seo,
    keywords: normalizeKeywords(payload.seo?.keywords),
  },
})

const buildAwardFilters = (filters = {}, publicOnly = false) => {
  const query = {}

  if (publicOnly) {
    query.status = AWARD_STATUS.PUBLISHED
  } else if (filters.status) {
    query.status = filters.status
  }

  if (filters.category) {
    query.category = filters.category
  }

  if (typeof filters.featured === 'boolean') {
    query.featured = filters.featured
  }

  if (filters.brand) {
    query.brand = filters.brand
  }

  if (filters.search) {
    query.or = [
      { title: { contains: filters.search } },
      { organization: { contains: filters.search } },
      { year: { contains: filters.search } },
      { category: { contains: filters.search } },
    ]
  }

  return query
}

const getSortOptions = (sort = 'displayOrder') => {
  const sortOptions = {
    displayOrder: { displayOrder: 1, awardDate: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    awardDate: { awardDate: -1 },
  }

  return sortOptions[sort] || sortOptions.displayOrder
}

const populateAwardMedia = (query) =>
  query
    .withRelations('certificateMedia')
    .withRelations('coverMedia')
    .withRelations('galleryMedia')
    .withRelations('brand', 'name slug category status')

const paginate = async ({ query, filters }) => {
  const page = filters.page || 1
  const limit = filters.limit || 20
  const skip = (page - 1) * limit
  const findQuery = Award.find(query)
    .sort(getSortOptions(filters.sort))
    .skip(skip)
    .limit(limit)

  const [items, total] = await Promise.all([
    populateAwardMedia(findQuery),
    Award.count(query),
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

  const existingAward = await Award.exists(query)

  if (existingAward) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Award slug already exists')
  }
}

const collectMediaIds = (payload) => [
  payload.certificateMedia,
  payload.coverMedia,
  ...(payload.galleryMedia || []),
].filter(Boolean)

const ensureMediaExists = async (mediaIds) => {
  if (mediaIds.length === 0) {
    return
  }

  const uniqueMediaIds = [...new Set(mediaIds.map((id) => id.toString()))]
  const existingCount = await Media.count({ _id: { in: uniqueMediaIds } })

  if (existingCount !== uniqueMediaIds.length) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'One or more media references are invalid')
  }
}

const ensureBrandExists = async (brandId) => {
  if (!brandId) {
    return
  }

  const brand = await Brand.exists({ _id: brandId })

  if (!brand) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Brand reference is invalid')
  }
}

export const getPublicAwards = async (filters) => {
  return paginate({
    query: buildAwardFilters(filters, true),
    filters,
  })
}

export const getPublicAwardBySlug = async (slug) => {
  const award = await populateAwardMedia(
    Award.findOne({
      slug,
      status: AWARD_STATUS.PUBLISHED,
    }),
  )

  if (!award) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Award not found')
  }

  return award
}

export const getAdminAwards = async (filters) => {
  return paginate({
    query: buildAwardFilters(filters),
    filters,
  })
}

export const createAward = async (payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug)
  await ensureBrandExists(normalizedPayload.brand)
  await ensureMediaExists(collectMediaIds(normalizedPayload))

  return Award.create({
    ...normalizedPayload,
    createdBy: adminId,
    updatedBy: adminId,
  })
}

export const updateAwardById = async (id, payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug, id)
  await ensureBrandExists(normalizedPayload.brand)
  await ensureMediaExists(collectMediaIds(normalizedPayload))

  const award = await populateAwardMedia(
    Award.updateById(
      id,
      {
        ...normalizedPayload,
        updatedBy: adminId,
      },
    ),
  )

  if (!award) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Award not found')
  }

  return award
}

export const softDeleteAwardById = async (id, adminId) => {
  const award = await populateAwardMedia(
    Award.updateById(
      id,
      {
        status: AWARD_STATUS.ARCHIVED,
        updatedBy: adminId,
      },
    ),
  )

  if (!award) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Award not found')
  }

  return award
}

