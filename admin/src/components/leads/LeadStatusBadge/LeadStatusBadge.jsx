const LeadStatusBadge = ({ status }) => (
  <span className={`status-badge lead-status-${String(status || 'New').toLowerCase().replace(/\s+/g, '-')}`}>
    {status || 'New'}
  </span>
)

export default LeadStatusBadge
