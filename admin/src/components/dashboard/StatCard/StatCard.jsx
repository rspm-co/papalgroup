import { motion } from 'framer-motion'

const StatCard = ({ icon: Icon, title, count, trend, index }) => {
  return (
    <motion.article
      className="dashboard-card stat-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      aria-label={`${title}: ${count}`}
    >
      <div className="stat-icon" aria-hidden="true">
        <Icon />
      </div>
      <div>
        <strong>{count}</strong>
        <span>{title}</span>
      </div>
      <p>{trend || (index === 0 ? 'All website enquiries' : 'Received since midnight')}</p>
    </motion.article>
  )
}

export default StatCard
