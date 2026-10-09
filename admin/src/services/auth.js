import { apiClient } from './api.js'
export const changeAdminPassword = async (payload) => {
  const response = await apiClient.put('/auth/password', payload)
  return response.data.data
}

export const loginAdmin = async (payload) => {
  const response = await apiClient.post('/auth/login', payload)
  return response.data.data
}

export const getAdminProfile = async () => {
  const response = await apiClient.get('/auth/profile')
  return response.data.data.user
}

export const logoutAdmin = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}
