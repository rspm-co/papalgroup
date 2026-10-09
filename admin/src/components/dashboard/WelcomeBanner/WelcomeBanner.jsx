import { motion } from 'framer-motion'

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
})

const WelcomeBanner = ({ user }) => {
  const now = new Date()

  return (
    <motion.section
      className="welcome-banner"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="Dashboard welcome"
    >
      <div>
        <p>Executive Overview</p>
        <h2>Welcome back, {user?.name || 'Super Admin'}</h2>
        <span>Here is a clear view of the lead activity that matters most today.</span>
      </div>
      <div className="welcome-time" aria-label="Current date and time">
        <strong>{timeFormatter.format(now)}</strong>
        <span>{dateFormatter.format(now)}</span>
      </div>
    </motion.section>
  )
}

export default WelcomeBanner
