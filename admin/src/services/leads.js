import { apiClient } from './api.js'

const unwrapLeadPayload = (response) => response.data?.data?.lead || response.data?.data?.item || response.data?.data

export const getLeads = async (params) => {
  const { dateFrom, dateTo, ...filters } = params || {}
  const response = await apiClient.get('/admin/leads', { params: { ...filters, fromDate: dateFrom || undefined, toDate: dateTo || undefined } })
  return response.data?.data || {}
}

export const getLeadById = async (id) => {
  const response = await apiClient.get(`/admin/leads/${id}`)
  return unwrapLeadPayload(response)
}

export const updateLead = async ({ id, payload }) => {
  const response = await apiClient.put(`/admin/leads/${id}`, payload)
  return unwrapLeadPayload(response)
}

export const deleteLead = async (id) => {
  const response = await apiClient.delete(`/admin/leads/${id}`)
  return unwrapLeadPayload(response)
}
