import { employmentTypes, jobSortOptions, jobStatuses, workModes } from '../../../constants/careers.js'

const JobFilters = ({ filters, onChange }) => (
  <div className="gallery-filters careers-filters">
    <label>
      Department
      <input value={filters.department} onChange={(event) => onChange({ department: event.target.value })} placeholder="Marketing" />
    </label>
    <label>
      Location
      <input value={filters.location} onChange={(event) => onChange({ location: event.target.value })} placeholder="Pune" />
    </label>
    <label>
      Employment Type
      <select value={filters.employmentType} onChange={(event) => onChange({ employmentType: event.target.value })}>
        <option value="">All types</option>
        {employmentTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </label>
    <label>
      Work Mode
      <select value={filters.workMode} onChange={(event) => onChange({ workMode: event.target.value })}>
        <option value="">All modes</option>
        {workModes.map((mode) => (
          <option key={mode} value={mode}>{mode}</option>
        ))}
      </select>
    </label>
    <label>
      Status
      <select value={filters.status} onChange={(event) => onChange({ status: event.target.value })}>
        <option value="">All statuses</option>
        {jobStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </label>
    <label>
      Sort
      <select value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
        {jobSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)

export default JobFilters
