import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../constants/api.js'

// Admin sessions end when the browser tab closes. Retire old persistent sessions.
localStorage.removeItem(TOKEN_STORAGE_KEY)
localStorage.removeItem(USER_STORAGE_KEY)
export const getStoredToken = () => sessionStorage.getItem(TOKEN_STORAGE_KEY)
export const setStoredToken = (token) => sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
export const clearStoredToken = () => sessionStorage.removeItem(TOKEN_STORAGE_KEY)
export const getStoredUser = () => {
  try {
    const user = sessionStorage.getItem(USER_STORAGE_KEY)
    return user ? JSON.parse(user) : null
  } catch {
    sessionStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}
export const setStoredUser = (user) => sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
export const clearStoredUser = () => sessionStorage.removeItem(USER_STORAGE_KEY)
