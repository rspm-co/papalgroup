import { FiPlus } from 'react-icons/fi'
import AwardsFilters from '../AwardsFilters'

const AwardsToolbar = ({ filters, onChange, onCreate }) => (
  <section className="gallery-toolbar awards-toolbar">
    <label className="gallery-search">
      Search
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search title, organization, year or category..."
      />
    </label>
    <AwardsFilters filters={filters} onChange={onChange} />
    <div className="gallery-toolbar-actions">
      <button type="button" className="primary-button" onClick={onCreate}>
        <FiPlus /> Add Award
      </button>
    </div>
  </section>
)

export default AwardsToolbar
