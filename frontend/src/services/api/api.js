import { apiClient, hasConfiguredApiBaseURL } from './axios'

export const getResource = async (endpoint, fallbackData) => {
  if (!hasConfiguredApiBaseURL) {
    return fallbackData
  }

  try {
    return await apiClient(endpoint)
  } catch (error) {
    if (error.status === 404) {
      return fallbackData
    }

    throw error
  }
}

export const postResource = async (endpoint, payload) => {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
