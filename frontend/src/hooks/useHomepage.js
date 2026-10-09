import { useCallback } from 'react'
import { getHomepageData } from '../services/api/homepage'
import { useApiResource } from './useApiResource'

export const useHomepage = () => {
  const emptySelector = useCallback((data) => !data, [])

  return useApiResource(getHomepageData, emptySelector)
}
