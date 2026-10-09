import { apiClient } from './api.js'

const unwrapAwardPayload = (response) => response.data?.data?.award || response.data?.data?.item || response.data?.data

export const getAwards = async (params) => {
  const response = await apiClient.get('/admin/awards', { params })
  return response.data?.data || {}
}

export const createAward = async (payload) => {
  const response = await apiClient.post('/admin/awards', payload)
  return unwrapAwardPayload(response)
}

export const updateAward = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/awards/${id}`, payload)
  return unwrapAwardPayload(response)
}

export const deleteAward = async (id) => {
  const response = await apiClient.delete(`/admin/awards/${id}`)
  return unwrapAwardPayload(response)
}
