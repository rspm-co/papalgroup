import { apiClient } from './api.js'

const unwrapGalleryPayload = (response) => response.data?.data?.gallery || response.data?.data?.item || response.data?.data

export const getGalleryItems = async (params) => {
  const response = await apiClient.get('/admin/gallery', { params })
  return response.data?.data || {}
}

export const createGalleryItem = async (payload) => {
  const response = await apiClient.post('/admin/gallery', payload)
  return unwrapGalleryPayload(response)
}

export const updateGalleryItem = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/gallery/${id}`, payload)
  return unwrapGalleryPayload(response)
}

export const deleteGalleryItem = async (id) => {
  const response = await apiClient.delete(`/admin/gallery/${id}`)
  return unwrapGalleryPayload(response)
}
