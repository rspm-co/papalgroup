export const API_CONFIG = {
  // The public site uses its complete built-in content unless a compatible
  // content API is explicitly enabled for the deployment.
  // Use the same-origin API path in production; Vite proxies this path to the
  // local backend during development.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 12000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

// Content GET requests are optional because the site includes built-in data.
// Form submissions still use the same-origin /api default below.
export const HAS_CONFIGURED_API_BASE_URL = import.meta.env.VITE_ENABLE_CONTENT_API === 'true'

export const API_ENDPOINTS = {
  homepage: '/homepage',
  brands: '/brands',
  gallery: '/gallery',
  awards: '/awards',
  contact: '/leads',
  careers: '/careers',
}
