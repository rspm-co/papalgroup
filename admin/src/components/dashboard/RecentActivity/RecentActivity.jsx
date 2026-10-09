import { motion } from 'framer-motion'

const fallbackActivity = [
  'Lead Received',
  'Lead Follow-up Due',
  'Lead Status Updated',
]

const RecentActivity = ({ activity = [] }) => {
  const items = activity.length > 0 ? activity : fallbackActivity.map((title) => ({ title }))

  return (
    <motion.section
      className="dashboard-panel"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.16, ease: 'easeOut' }}
      aria-labelledby="recent-activity-title"
    >
      <div className="panel-heading">
        <div>
          <p>Timeline</p>
          <h3 id="recent-activity-title">Recent Activity</h3>
        </div>
      </div>
      <ol className="activity-list">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <span aria-hidden="true" />
            <div>
              <strong>{item.title}</strong>
              <small>{item.timestamp ? new Date(item.timestamp).toLocaleString('en-IN') : 'Awaiting activity data'}</small>
            </div>
          </li>
        ))}
      </ol>
    </motion.section>
  )
}

export default RecentActivity
