import { FiPlus } from 'react-icons/fi'
import JobFilters from '../JobFilters'

const JobToolbar = ({ filters, onChange, onCreate }) => (
  <section className="gallery-toolbar careers-toolbar">
    <label className="gallery-search">
      Search
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search job title, department or location..."
      />
    </label>
    <JobFilters filters={filters} onChange={onChange} />
    <div className="gallery-toolbar-actions">
      <button type="button" className="primary-button" onClick={onCreate}>
        <FiPlus /> Add Job
      </button>
    </div>
  </section>
)

export default JobToolbar
