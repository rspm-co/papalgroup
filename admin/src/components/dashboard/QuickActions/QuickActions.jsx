import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiInbox } from 'react-icons/fi'

const QuickActions = () => (
  <section className="dashboard-action-card" aria-labelledby="quick-actions-title">
    <FiInbox className="action-card-icon" aria-hidden="true" />
    <h3 id="quick-actions-title">Turn enquiries into opportunities.</h3>
    <p>Review new leads, update their status, and keep your follow-ups on track.</p>
    <Link to="/leads" className="primary-button">Manage leads <FiArrowUpRight aria-hidden="true" /></Link>
  </section>
)
export default QuickActions
