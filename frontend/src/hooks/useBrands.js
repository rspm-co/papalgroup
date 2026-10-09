import { useCallback } from 'react'
import { getBrandsData } from '../services/api/brands'
import { useApiResource } from './useApiResource'

export const useBrands = () => {
  const emptySelector = useCallback(
    (data) => !Array.isArray(data.items) || data.items.length === 0,
    [],
  )

  return useApiResource(getBrandsData, emptySelector)
}
