import { useContext } from 'react'
import { WebsiteContext } from '../context/WebsiteContextValue'

export const useWebsite = () => {
  const context = useContext(WebsiteContext)

  if (!context) {
    throw new Error('useWebsite must be used within WebsiteProvider.')
  }

  return context
}
