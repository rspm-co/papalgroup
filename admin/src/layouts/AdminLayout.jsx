import { useCallback, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import { adminRoutes } from '../constants/navigation.js'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  const location = useLocation()
  const activeRoute =
    adminRoutes.find((route) => route.path === location.pathname) || adminRoutes[0]

  return (
    <div className="admin-shell">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="admin-main">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          title={activeRoute.pageTitle}
          onMenuClick={() => setIsSidebarOpen((current) => !current)}
        />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
