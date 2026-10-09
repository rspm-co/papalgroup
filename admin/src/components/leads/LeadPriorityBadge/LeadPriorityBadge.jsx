const LeadPriorityBadge = ({ priority }) => (
  <span className={`priority-badge priority-${String(priority || 'Medium').toLowerCase()}`}>
    {priority || 'Medium'}
  </span>
)

export default LeadPriorityBadge
