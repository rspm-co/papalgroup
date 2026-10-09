import { HTTP_STATUS } from '../../constants/app.constants.js'
import { successResponse } from '../../utils/apiResponse.js'
import { getDashboardData } from './dashboard.service.js'

export const getDashboardOverview = async (_req, res, next) => {
  try {
    const data = await getDashboardData()
    return res.status(HTTP_STATUS.OK).json(successResponse({
      message: 'Dashboard fetched successfully',
      data,
    }))
  } catch (error) {
    return next(error)
  }
}
