import { API_ENDPOINTS } from '../../constants/api'
import { postResource } from './api'

export const submitContactForm = (payload) =>
  postResource(API_ENDPOINTS.contact, payload)
