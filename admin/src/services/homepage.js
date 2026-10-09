import { apiClient } from './api.js'

export const getHomepageContent = async () => {
  try {
    const response = await apiClient.get('/admin/homepage')
    return response.data.data.homepage || response.data.data
  } catch (error) {
    if (error.response?.status !== 404) {
      throw error
    }

    try {
      const response = await apiClient.get('/homepage/admin')
      return response.data.data.homepage || response.data.data
    } catch (fallbackError) {
      if (fallbackError.response?.status === 404) {
        return {}
      }
      throw fallbackError
    }
  }
}

export const updateHomepageContent = async ({ id, payload }) => {
  const response = id
    ? await apiClient.put(`/homepage/${id}`, payload)
    : await apiClient.post('/homepage', payload)
  return response.data.data.homepage || response.data.data
}
