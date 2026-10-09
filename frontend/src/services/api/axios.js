import { API_CONFIG, HAS_CONFIGURED_API_BASE_URL } from '../../constants/api'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const buildUrl = (endpoint) => {
  if (!API_CONFIG.baseURL) {
    throw new ApiError('API base URL is not configured.', 0)
  }

  return `${API_CONFIG.baseURL.replace(/\/$/, '')}${endpoint}`
}

export const apiClient = async (endpoint, options = {}) => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), API_CONFIG.timeout)

  try {
    const response = await fetch(buildUrl(endpoint), {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      const failure = await response.json().catch(() => null)
      throw new ApiError(failure?.message || response.statusText || 'Request failed', response.status)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export const hasApiBaseURL = Boolean(API_CONFIG.baseURL)
export const hasConfiguredApiBaseURL = HAS_CONFIGURED_API_BASE_URL
