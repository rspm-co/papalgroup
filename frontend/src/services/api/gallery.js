import { API_ENDPOINTS } from '../../constants/api'
import {
  momentCategories,
  moments,
  momentsSection,
} from '../../data/galleryData'
import { getResource } from './api'

export const getGalleryData = () =>
  getResource(API_ENDPOINTS.gallery, {
    section: momentsSection,
    categories: momentCategories,
    items: moments,
  })
