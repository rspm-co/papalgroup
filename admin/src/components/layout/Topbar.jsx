import { FiChevronRight, FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const Topbar = ({ title, onMenuClick, isSidebarOpen }) => {
  const { user } = useAuth()
  return (
    <header className="topbar">
      <div className="topbar-title">
        <button type="button" className="icon-button mobile-menu" onClick={onMenuClick} aria-label="Toggle navigation" aria-expanded={isSidebarOpen} aria-controls="admin-navigation"><FiMenu /></button>
        <div className="topbar-breadcrumb"><span>Workspace</span><FiChevronRight aria-hidden="true" /><h1>{title}</h1></div>
      </div>
      <Link to="/profile" className="admin-profile" aria-label="Open your profile">
        <span>{user?.name?.charAt(0)?.toUpperCase() || 'A'}</span>
        <div><strong>{user?.name || 'Super Admin'}</strong><small>{(user?.role || 'SUPER_ADMIN').replace(/_/g, ' ')}</small></div>
      </Link>
    </header>
  )
}
export default Topbar
