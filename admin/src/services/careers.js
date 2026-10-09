import { apiClient } from './api.js'

const unwrapCareerPayload = (response) => response.data?.data?.career || response.data?.data?.job || response.data?.data?.item || response.data?.data

export const getJobs = async (params) => {
  const response = await apiClient.get('/admin/careers', { params })
  return response.data?.data || {}
}

export const createJob = async (payload) => {
  const response = await apiClient.post('/admin/careers', payload)
  return unwrapCareerPayload(response)
}

export const updateJob = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/careers/${id}`, payload)
  return unwrapCareerPayload(response)
}

export const deleteJob = async (id) => {
  const response = await apiClient.delete(`/admin/careers/${id}`)
  return unwrapCareerPayload(response)
}
