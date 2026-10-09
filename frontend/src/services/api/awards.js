import { API_ENDPOINTS } from '../../constants/api'
import { awards, awardsFeature, awardsSection } from '../../data/awardsData'
import { getResource } from './api'

export const getAwardsData = () =>
  getResource(API_ENDPOINTS.awards, {
    section: awardsSection,
    items: awards,
    feature: awardsFeature,
  })
