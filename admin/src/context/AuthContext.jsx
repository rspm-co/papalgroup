import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAdminProfile, loginAdmin, logoutAdmin, changeAdminPassword } from '../services/auth.js'
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from '../utils/storage.js'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(getStoredToken())
  const [user, setUser] = useState(getStoredUser())
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(getStoredToken()))

  const clearSession = useCallback(() => {
    clearStoredToken()
    clearStoredUser()
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await loginAdmin(credentials)
    setStoredToken(data.token)
    setStoredUser(data.user)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      if (token) {
        await logoutAdmin()
      }
    } catch {
      // Local logout remains valid even if the API session call fails.
    } finally {
      clearSession()
      navigate('/login', { replace: true })
    }
  }, [clearSession, navigate, token])

  const changePassword = useCallback(async (values) => {
    const data = await changeAdminPassword(values)
    setStoredToken(data.token)
    setStoredUser(data.user)
    setToken(data.token)
    setUser(data.user)
  }, [])

  useEffect(() => {
    const hydrateProfile = async () => {
      if (!token) {
        setIsBootstrapping(false)
        return
      }

      try {
        const profile = await getAdminProfile()
        setStoredUser(profile)
        setUser(profile)
      } catch {
        clearSession()
      } finally {
        setIsBootstrapping(false)
      }
    }

    hydrateProfile()
  }, [clearSession, token])

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession()
      toast.error('Session expired. Please login again.')
      navigate('/login', { replace: true })
    }

    window.addEventListener('admin:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('admin:unauthorized', handleUnauthorized)
  }, [clearSession, navigate])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isBootstrapping,
      login,
      logout,
      changePassword,
    }),
    [isBootstrapping, login, logout, changePassword, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
