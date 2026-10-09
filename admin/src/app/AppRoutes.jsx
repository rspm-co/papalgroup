import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import { adminRoutes } from '../constants/navigation.js'

// Keep the CRM dashboard import explicit. A legacy `pages/Dashboard.jsx` shell
// also exists alongside the feature directory, and Vite resolves the shorter
// path to that legacy file first. This ensures `/dashboard` renders the
// lead-management dashboard with live metrics and recent leads.
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard.jsx'))
const Leads = lazy(() => import('../pages/Leads'))
const Profile = lazy(() => import('../pages/Profile'))

const PageLoader = () => (
  <section className="dashboard-state">
    <span className="loader" />
    <p>Loading admin module...</p>
  </section>
)

const routePageMap = {
  '/dashboard': <Dashboard />,
  '/leads': <Leads />,
  '/profile': <Profile />,
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path.replace('/', '')}
            element={<Suspense fallback={<PageLoader />}>{routePageMap[route.path]}</Suspense>}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
