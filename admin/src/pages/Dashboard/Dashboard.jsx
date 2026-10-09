import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  QuickActions,
  RecentLeads,
  StatsGrid,
  WelcomeBanner,
} from '../../components/dashboard'
import { useAuth } from '../../hooks/useAuth.js'
import { getDashboardOverview } from '../../services/dashboard.js'
import { LeadBreakdown } from '../../components/dashboard/StatsGrid/StatsGrid.jsx'
import { FiRefreshCw } from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useAuth()
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: getDashboardOverview,
  })

  return (
    <>
      <Helmet>
        <title>Dashboard | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="dashboard-page">
        <WelcomeBanner user={user} />
        <div className="dashboard-section-heading"><div><h2>Lead overview</h2><p>Your website enquiries at a glance.</p></div><button type="button" className="secondary-button" onClick={() => refetch()} disabled={isFetching}><FiRefreshCw aria-hidden="true" />{isFetching ? 'Refreshing…' : 'Refresh'}</button></div>

        {isLoading && (
          <section className="dashboard-state" aria-live="polite">
            <span className="loader" />
            <p>Loading dashboard overview...</p>
          </section>
        )}

        {isError && (
          <section className="dashboard-state error-state" role="alert">
            <h2>Unable to load dashboard</h2>
            <p>{error?.response?.data?.message || 'The dashboard API is not available right now.'}</p>
            <button type="button" className="primary-button" onClick={() => refetch()}>
              Try Again
            </button>
          </section>
        )}

        {!isLoading && !isError && (
          <motion.div
            className="dashboard-stack"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <StatsGrid stats={data?.stats} />
            <div className="dashboard-layout-grid">
              <RecentLeads leads={data?.recentLeads} />
              <div className="dashboard-aside"><LeadBreakdown stats={data?.stats} /><QuickActions /></div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default Dashboard
