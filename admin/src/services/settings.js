import { apiClient } from './api.js'

const unwrapSettingsPayload = (response) => response.data?.data?.settings || response.data?.data?.item || response.data?.data

export const getSettings = async () => {
  try {
    const response = await apiClient.get('/admin/settings')
    return unwrapSettingsPayload(response)
  } catch (error) {
    if (error.response?.status === 404) {
      return {}
    }
    throw error
  }
}

export const updateSettings = async ({ id, payload }) => {
  const response = id
    ? await apiClient.put(`/admin/settings/${id}`, payload)
    : await apiClient.post('/admin/settings', payload)
  return unwrapSettingsPayload(response)
}
