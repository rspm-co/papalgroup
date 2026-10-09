import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Career, { CAREER_STATUS } from './career.model.js'

const normalizeStringArray = (items) => {
  if (!items) {
    return []
  }

  return Array.isArray(items)
    ? items.map((item) => String(item).trim()).filter(Boolean)
    : String(items)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
}

const normalizePayload = (payload) => ({
  ...payload,
  slug: payload.slug?.toLowerCase(),
  responsibilities: normalizeStringArray(payload.responsibilities),
  requirements: normalizeStringArray(payload.requirements),
  skills: normalizeStringArray(payload.skills),
  benefits: normalizeStringArray(payload.benefits),
  seo: {
    ...payload.seo,
    keywords: normalizeStringArray(payload.seo?.keywords),
  },
})

const buildCareerFilters = (filters = {}, publicOnly = false) => {
  const query = {}

  if (publicOnly) {
    query.status = CAREER_STATUS.PUBLISHED
  } else if (filters.status) {
    query.status = filters.status
  }

  if (filters.department) {
    query.department = { contains: filters.department }
  }

  if (filters.location) {
    query.location = { contains: filters.location }
  }

  if (filters.employmentType) {
    query.employmentType = filters.employmentType
  }

  if (filters.workMode) {
    query.workMode = filters.workMode
  }

  if (filters.search) {
    query.or = [
      { title: { contains: filters.search } },
      { department: { contains: filters.search } },
      { location: { contains: filters.search } },
    ]
  }

  return query
}

const getSortOptions = (sort = 'displayOrder') => {
  const sortOptions = {
    displayOrder: { displayOrder: 1, applicationDeadline: 1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    applicationDeadline: { applicationDeadline: 1 },
  }

  return sortOptions[sort] || sortOptions.displayOrder
}

const paginate = async ({ query, filters }) => {
  const page = filters.page || 1
  const limit = filters.limit || 20
  const skip = (page - 1) * limit

  const [items, total] = await Promise.all([
    Career.find(query).sort(getSortOptions(filters.sort)).skip(skip).limit(limit),
    Career.count(query),
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

  const existingCareer = await Career.exists(query)

  if (existingCareer) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Career slug already exists')
  }
}

export const getPublicCareers = async (filters) => {
  return paginate({
    query: buildCareerFilters(filters, true),
    filters,
  })
}

export const getPublicCareerBySlug = async (slug) => {
  const career = await Career.findOne({
    slug,
    status: CAREER_STATUS.PUBLISHED,
  })

  if (!career) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Career not found')
  }

  return career
}

export const getAdminCareers = async (filters) => {
  return paginate({
    query: buildCareerFilters(filters),
    filters,
  })
}

export const createCareer = async (payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug)

  return Career.create({
    ...normalizedPayload,
    createdBy: adminId,
    updatedBy: adminId,
  })
}

export const updateCareerById = async (id, payload, adminId) => {
  const normalizedPayload = normalizePayload(payload)

  await ensureUniqueSlug(normalizedPayload.slug, id)

  const career = await Career.updateById(
    id,
    {
      ...normalizedPayload,
      updatedBy: adminId,
    },
  )

  if (!career) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Career not found')
  }

  return career
}

export const softDeleteCareerById = async (id, adminId) => {
  const career = await Career.updateById(
    id,
    {
      status: CAREER_STATUS.ARCHIVED,
      updatedBy: adminId,
    },
  )

  if (!career) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Career not found')
  }

  return career
}

