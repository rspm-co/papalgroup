import { HTTP_STATUS } from '../../constants/app.constants.js'
import { matchedData } from 'express-validator'
import { successResponse } from '../../utils/apiResponse.js'
import {
  createLead,
  getAdminLeads,
  getLeadById,
  softDeleteLeadById,
  updateLeadById,
} from './lead.service.js'

export const createLeadContent = async (req, res, next) => {
  try {
    const lead = await createLead(matchedData(req, { locations: ['body'] }))

    return res.status(HTTP_STATUS.CREATED).json(
      successResponse({
        message: 'Lead submitted successfully',
        data: { id: lead._id },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const listAdminLeads = async (req, res, next) => {
  try {
    const leads = await getAdminLeads(matchedData(req, { locations: ['query'] }))

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Leads fetched successfully',
        data: leads,
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const getAdminLead = async (req, res, next) => {
  try {
    const lead = await getLeadById(req.params.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Lead fetched successfully',
        data: { lead },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const updateLeadContent = async (req, res, next) => {
  try {
    const lead = await updateLeadById(req.params.id, matchedData(req, { locations: ['body'] }), req.user.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Lead updated successfully',
        data: { lead },
      }),
    )
  } catch (error) {
    return next(error)
  }
}

export const deleteLeadContent = async (req, res, next) => {
  try {
    const lead = await softDeleteLeadById(req.params.id)

    return res.status(HTTP_STATUS.OK).json(
      successResponse({
        message: 'Lead deleted successfully',
        data: { lead },
      }),
    )
  } catch (error) {
    return next(error)
  }
}
