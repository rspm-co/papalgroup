import { API_ENDPOINTS } from '../../constants/api'
import { getResource, postResource } from './api'

export const getCareersData = () =>
  getResource(API_ENDPOINTS.careers, {
    openings: [],
  })

export const submitCareerApplication = (payload) =>
  postResource(API_ENDPOINTS.contact, { ...payload, leadType: 'Career' })
