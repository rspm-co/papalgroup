import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Brand, { BRAND_STATUS } from './brand.model.js'

const buildBrandFilters = ({ name, category, status } = {}, publicOnly = false) => {
  const filters = {}

  if (publicOnly) {
    filters.status = BRAND_STATUS.ACTIVE
  } else if (status) {
    filters.status = status
  }

  if (name) {
    filters.name = { contains: name }
  }

  if (category) {
    filters.category = category
  }

  return filters
}

const getSortOptions = (sort = 'displayOrder') => {
  const sortOptions = {
    displayOrder: { displayOrder: 1, createdAt: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
  }

  return sortOptions[sort] || sortOptions.displayOrder
}

const ensureUniqueSlug = async (slug, excludedId = null) => {
  const query = { slug }

  if (excludedId) {
    query._id = { ne: excludedId }
  }

  const existingBrand = await Brand.exists(query)

  if (existingBrand) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Brand slug already exists')
  }
}

export const getPublicBrands = async (filters) => {
  return Brand.find(buildBrandFilters(filters, true)).sort(
    getSortOptions(filters?.sort),
  )
}

export const getPublicBrandBySlug = async (slug) => {
  const brand = await Brand.findOne({
    slug,
    status: BRAND_STATUS.ACTIVE,
  })

  if (!brand) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Brand not found')
  }

  return brand
}

export const getAdminBrands = async (filters) => {
  return Brand.find(buildBrandFilters(filters)).sort(getSortOptions(filters?.sort))
}

export const createBrand = async (payload, adminId) => {
  await ensureUniqueSlug(payload.slug)

  return Brand.create({
    ...payload,
    slug: payload.slug.toLowerCase(),
    createdBy: adminId,
    updatedBy: adminId,
  })
}

export const updateBrandById = async (id, payload, adminId) => {
  await ensureUniqueSlug(payload.slug, id)

  const brand = await Brand.updateById(
    id,
    {
      ...payload,
      slug: payload.slug.toLowerCase(),
      updatedBy: adminId,
    },
  )

  if (!brand) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Brand not found')
  }

  return brand
}

export const softDeleteBrandById = async (id, adminId) => {
  const brand = await Brand.updateById(
    id,
    {
      status: BRAND_STATUS.INACTIVE,
      updatedBy: adminId,
    },
  )

  if (!brand) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Brand not found')
  }

  return brand
}

