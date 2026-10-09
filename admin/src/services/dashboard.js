import { apiClient } from './api.js'

export const getDashboardOverview = async () => {
  const response = await apiClient.get('/admin/dashboard')
  return response.data.data
}
