import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import Homepage from './homepage.model.js'

const sortHomepageContent = (document) => {
  if (!document) {
    return null
  }

  const homepage = structuredClone(document)

  homepage.journey = [...homepage.journey].sort(
    (current, next) => current.displayOrder - next.displayOrder,
  )

  homepage.achievements = [...homepage.achievements].sort(
    (current, next) => current.displayOrder - next.displayOrder,
  )

  return homepage
}

export const getPublicHomepage = async () => {
  const homepage = await Homepage.findOne({ 'hero.isActive': true })
    .sort({ updatedAt: -1 })
    

  if (!homepage) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Homepage content not found')
  }

  return sortHomepageContent(homepage)
}

export const getAdminHomepage = async () => {
  const homepage = await Homepage.findOne()
    .sort({ updatedAt: -1 })
    .withRelations('updatedBy', 'name email role')

  if (!homepage) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Homepage content not found')
  }

  return sortHomepageContent(homepage)
}

export const createHomepage = async (payload, adminId) => {
  const existingHomepage = await Homepage.exists({})

  if (existingHomepage) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Homepage content already exists',
    )
  }

  const homepage = await Homepage.create({
    ...payload,
    updatedBy: adminId,
  })

  return sortHomepageContent(homepage)
}

export const updateHomepageById = async (id, payload, adminId) => {
  const homepage = await Homepage.updateById(
    id,
    {
      ...payload,
      updatedBy: adminId,
    },
  )

  if (!homepage) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Homepage content not found')
  }

  return sortHomepageContent(homepage)
}

export const deleteHomepageById = async (id) => {
  const homepage = await Homepage.deleteById(id)

  if (!homepage) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Homepage content not found')
  }

  return sortHomepageContent(homepage)
}
