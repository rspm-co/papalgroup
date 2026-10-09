import { leadPriorities, leadSortOptions, leadStatuses, leadTypes } from '../../../constants/leads.js'
import { useAuth } from '../../../hooks/useAuth.js'

const LeadFilters = ({ filters, onChange }) => {
  const { user } = useAuth()
  return (
  <div className="gallery-filters leads-filters">
    <label>
      Lead Type
      <select value={filters.leadType} onChange={(event) => onChange({ leadType: event.target.value })}>
        <option value="">All types</option>
        {leadTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </label>
    <label>
      Status
      <select value={filters.status} onChange={(event) => onChange({ status: event.target.value })}>
        <option value="">All statuses</option>
        {leadStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </label>
    <label>
      Priority
      <select value={filters.priority} onChange={(event) => onChange({ priority: event.target.value })}>
        <option value="">All priorities</option>
        {leadPriorities.map((priority) => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </select>
    </label>
    <label>
      Preferred Brand
      <input value={filters.preferredBrand} onChange={(event) => onChange({ preferredBrand: event.target.value })} placeholder="Brand name" />
    </label>
    <label>
      From
      <input type="date" value={filters.dateFrom} onChange={(event) => onChange({ dateFrom: event.target.value })} />
    </label>
    <label>
      To
      <input type="date" value={filters.dateTo} onChange={(event) => onChange({ dateTo: event.target.value })} />
    </label>
    <label>
      Assigned To
      <select value={filters.assignedTo} onChange={(event) => onChange({ assignedTo: event.target.value })}><option value="">Everyone</option><option value={user?.id}>Assigned to me</option></select>
    </label>
    <label>
      Sort
      <select value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
        {leadSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)
}

export default LeadFilters
