import { NavLink } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { adminRoutes, appConfig } from '../../constants/navigation.js'
import { useAuth } from '../../hooks/useAuth.js'

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1100px)').matches)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1100px)')
    const update = () => setIsMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!isMobile || !isOpen) return undefined
    const closeOnEscape = event => { if (event.key === 'Escape') onClose() }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape) }
  }, [isMobile, isOpen, onClose])

  return (
    <>
      <aside id="admin-navigation" inert={isMobile && !isOpen ? true : undefined} aria-hidden={isMobile && !isOpen ? true : undefined} className={clsx('sidebar', isOpen && 'sidebar-open')}>
        <div className="sidebar-brand">
          <div className="brand-mark">{appConfig.shortName}</div>
          <div>
            <p>{appConfig.name}</p>
            <span>{appConfig.adminLabel}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Admin navigation">
          <p className="sidebar-section-label">Workspace</p>
          {adminRoutes.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => clsx('sidebar-link', isActive && 'active')}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <button type="button" className="sidebar-logout" onClick={logout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>
      {isOpen && <button type="button" className="sidebar-backdrop" onClick={onClose} aria-label="Close sidebar" />}
    </>
  )
}

export default Sidebar
