import { motion } from 'framer-motion'

const statusConfig = [
  { key: 'database', label: 'Database' },
  { key: 'api', label: 'API' },
  { key: 'cloudinary', label: 'Cloudinary' },
  { key: 'website', label: 'Website' },
]

const SystemStatus = ({ status = {} }) => {
  return (
    <motion.section
      className="dashboard-panel"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.2, ease: 'easeOut' }}
      aria-labelledby="system-status-title"
    >
      <div className="panel-heading">
        <div>
          <p>Infrastructure</p>
          <h3 id="system-status-title">System Status</h3>
        </div>
      </div>
      <div className="status-list">
        {statusConfig.map((item) => {
          const value = status[item.key] || 'Pending'
          const isHealthy = ['Operational', 'Online', 'Connected', 'Healthy'].includes(value)

          return (
            <div className="status-row" key={item.key}>
              <span className={isHealthy ? 'status-dot healthy' : 'status-dot'} aria-hidden="true" />
              <strong>{item.label}</strong>
              <small>{value}</small>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default SystemStatus
