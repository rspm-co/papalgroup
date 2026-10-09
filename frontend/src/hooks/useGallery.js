import { useCallback } from 'react'
import { getGalleryData } from '../services/api/gallery'
import { useApiResource } from './useApiResource'

export const useGallery = () => {
  const emptySelector = useCallback(
    (data) => !Array.isArray(data.items) || data.items.length === 0,
    [],
  )

  return useApiResource(getGalleryData, emptySelector)
}
