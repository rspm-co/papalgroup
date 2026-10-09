import { API_ENDPOINTS } from '../../constants/api'
import { brands, brandsSection } from '../../data/brandsData'
import { getResource } from './api'

export const getBrandsData = () =>
  getResource(API_ENDPOINTS.brands, {
    section: brandsSection,
    items: brands,
  })
