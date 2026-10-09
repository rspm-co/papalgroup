import { apiClient } from './api.js'

const unwrapBrandPayload = (response) => response.data?.data?.brand || response.data?.data?.item || response.data?.data

export const getBrands = async (params) => {
  const { search, ...filters } = params || {}
  const cleanedParams = Object.fromEntries(
    Object.entries({ ...filters, name: search }).filter(([, value]) => value !== '' && value != null),
  )
  const response = await apiClient.get('/admin/brands', { params: cleanedParams })
  return response.data?.data || {}
}

export const createBrand = async (payload) => {
  const response = await apiClient.post('/admin/brands', payload)
  return unwrapBrandPayload(response)
}

export const updateBrand = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/brands/${id}`, payload)
  return unwrapBrandPayload(response)
}

export const deleteBrand = async (id) => {
  const response = await apiClient.delete(`/admin/brands/${id}`)
  return unwrapBrandPayload(response)
}
