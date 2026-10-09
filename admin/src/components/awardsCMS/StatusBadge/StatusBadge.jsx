const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${String(status || 'Draft').toLowerCase().replace(/\s+/g, '-')}`}>
    {status || 'Draft'}
  </span>
)

export default StatusBadge
