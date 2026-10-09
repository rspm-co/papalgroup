import { API_ENDPOINTS } from '../../constants/api'
import { homepageData } from '../../data/homepageData'
import { getResource } from './api'

export const getHomepageData = () =>
  getResource(API_ENDPOINTS.homepage, homepageData)
