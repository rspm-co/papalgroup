import { HTTP_STATUS } from '../../constants/app.constants.js'
import ApiError from '../../utils/ApiError.js'
import AuthUser from '../auth/auth.model.js'
import Media from '../media/media.model.js'
import Lead, { LEAD_PRIORITY } from './lead.model.js'

const normalizeAttachments = (attachments = []) =>
  attachments.map((attachment) => ({
    media: attachment.media || null,
    url: attachment.url || '',
    label: attachment.label || '',
  }))

const buildLeadFilters = (filters = {}) => {
  const query = { isDeleted: false }

  if (filters.status) {
    query.status = filters.status
  }

  if (filters.leadType) {
    query.leadType = filters.leadType
  }

  if (filters.priority) {
    query.priority = filters.priority
  }

  if (filters.preferredBrand) query.preferredBrand = filters.preferredBrand
  if (filters.assignedTo) query.assignedTo = filters.assignedTo

  if (filters.fromDate || filters.toDate) {
    query.createdAt = {}

    if (filters.fromDate) {
      const startOfDay = new Date(filters.fromDate)
      startOfDay.setHours(0, 0, 0, 0)
      query.createdAt.gte = startOfDay
    }

    if (filters.toDate) {
      const endOfDay = new Date(filters.toDate)
      endOfDay.setHours(23, 59, 59, 999)
      query.createdAt.lte = endOfDay
    }
  }

  if (filters.search) {
    const search = filters.search
    query.or = [
      { fullName: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
      { company: { contains: search } },
      { city: { contains: search } },
      { preferredBrand: { contains: search } },
    ]
  }

  return query
}

const getSortOptions = (sort = 'newest') => {
  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    followUpDate: { followUpDate: 1, createdAt: -1 },
    priority: { priority: [LEAD_PRIORITY.URGENT, LEAD_PRIORITY.HIGH, LEAD_PRIORITY.MEDIUM, LEAD_PRIORITY.LOW], createdAt: -1 },
  }

  return sortOptions[sort] || sortOptions.newest
}

const populateLead = (query) =>
  query
    .withRelations('assignedTo', 'name email role')
    .withRelations('attachments.media')
    .withRelations('internalNotes.addedBy', 'name email role')

const ensureAttachmentMediaExists = async (attachments = []) => {
  const mediaIds = attachments
    .map((attachment) => attachment.media)
    .filter(Boolean)
    .map((id) => id.toString())

  if (mediaIds.length === 0) {
    return
  }

  const uniqueMediaIds = [...new Set(mediaIds)]
  const existingCount = await Media.count({ _id: { in: uniqueMediaIds } })

  if (existingCount !== uniqueMediaIds.length) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'One or more attachments are invalid')
  }
}

const ensureAssignedUserExists = async (assignedTo) => {
  if (!assignedTo) {
    return
  }

  const user = await AuthUser.exists({ _id: assignedTo })

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Assigned user is invalid')
  }
}

export const createLead = async (payload) => {
  const attachments = normalizeAttachments(payload.attachments)

  await ensureAttachmentMediaExists(attachments)

  return Lead.create({
    ...payload,
    attachments,
  })
}

export const getAdminLeads = async (filters = {}) => {
  const page = filters.page || 1
  const limit = filters.limit || 20
  const skip = (page - 1) * limit
  const query = buildLeadFilters(filters)

  const findQuery = populateLead(
    Lead.find(query).sort(getSortOptions(filters.sort)).skip(skip).limit(limit),
  )

  const [items, total] = await Promise.all([
    findQuery,
    Lead.count(query),
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

export const getLeadById = async (id) => {
  const lead = await populateLead(Lead.findOne({ _id: id, isDeleted: false }))

  if (!lead) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found')
  }

  return lead
}

export const updateLeadById = async (id, payload, adminId) => {
  await ensureAssignedUserExists(payload.assignedTo)

  const updatePayload = {}

  if (Object.hasOwn(payload, 'status')) {
    updatePayload.status = payload.status
  }

  if (Object.hasOwn(payload, 'priority')) {
    updatePayload.priority = payload.priority
  }

  if (Object.hasOwn(payload, 'assignedTo')) {
    updatePayload.assignedTo = payload.assignedTo || null
  }

  if (Object.hasOwn(payload, 'followUpDate')) {
    updatePayload.followUpDate = payload.followUpDate || null
  }

  const lead = await populateLead(
    Lead.updateFirst(
      { _id: id, isDeleted: false },
      current => ({
        ...updatePayload,
        ...(payload.note ? { internalNotes: [...current.internalNotes, { note: payload.note, addedBy: adminId, addedAt: new Date() }] } : {}),
      }),
    ),
  )

  if (!lead) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found')
  }

  return lead
}

export const softDeleteLeadById = async (id) => {
  const lead = await populateLead(
    Lead.updateFirst(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
    ),
  )

  if (!lead) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Lead not found')
  }

  return lead
}
