import { FiGrid, FiList, FiUpload } from 'react-icons/fi'
import MediaFilters from '../MediaFilters'

const MediaToolbar = ({ filters, view, onFilterChange, onViewChange, onUpload }) => (
  <section className="media-toolbar">
    <label className="media-search">
      Search
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onFilterChange({ search: event.target.value })}
        placeholder="Search file name, alt text or tags..."
      />
    </label>
    <MediaFilters filters={filters} onChange={onFilterChange} />
    <div className="media-toolbar-actions" aria-label="Media toolbar actions">
      <div className="view-toggle" role="group" aria-label="View toggle">
        <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => onViewChange('grid')} aria-label="Grid view">
          <FiGrid />
        </button>
        <button type="button" className={view === 'list' ? 'active' : ''} onClick={() => onViewChange('list')} aria-label="List view">
          <FiList />
        </button>
      </div>
      <button type="button" className="primary-button" onClick={onUpload}>
        <FiUpload /> Upload
      </button>
    </div>
  </section>
)

export default MediaToolbar
