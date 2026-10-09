import { apiClient } from './api.js'

export const getMediaLibrary = async (params) => {
  const response = await apiClient.get('/admin/media', { params })
  return response.data.data
}

export const uploadMedia = async ({ file, metadata, onProgress }) => {
  const formData = new FormData()
  formData.append('image', file)
  Object.entries(metadata).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const response = await apiClient.post('/admin/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (event.total) onProgress?.(Math.round((event.loaded * 100) / event.total))
    },
  })

  return response.data.data.media
}

export const uploadMultipleMedia = async ({ files, metadata, onProgress }) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))
  Object.entries(metadata).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const response = await apiClient.post('/admin/media/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (event.total) onProgress?.(Math.round((event.loaded * 100) / event.total))
    },
  })

  return response.data.data.media
}

export const updateMedia = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/media/${id}`, payload)
  return response.data.data.media
}

export const deleteMedia = async (id) => {
  const response = await apiClient.delete(`/admin/media/${id}`)
  return response.data.data.media
}
