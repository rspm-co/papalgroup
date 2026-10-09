import { useMemo } from 'react'
import { useHomepage } from '../hooks/useHomepage'
import { WebsiteContext } from './WebsiteContextValue'

export const WebsiteProvider = ({ children }) => {
  const homepage = useHomepage()

  const value = useMemo(
    () => ({
      homepage,
    }),
    [homepage],
  )

  return (
    <WebsiteContext.Provider value={value}>{children}</WebsiteContext.Provider>
  )
}
