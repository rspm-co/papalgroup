import { FiGrid, FiList, FiPlus } from 'react-icons/fi'
import GalleryFilters from '../GalleryFilters'

const GalleryToolbar = ({ filters, view, onChange, onViewChange, onCreate }) => (
  <section className="gallery-toolbar">
    <label className="gallery-search">
      Search
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search title, category or tags..."
      />
    </label>
    <GalleryFilters filters={filters} onChange={onChange} />
    <div className="gallery-toolbar-actions">
      <div className="view-toggle" role="group" aria-label="Gallery view toggle">
        <button type="button" className={view === 'table' ? 'active' : ''} onClick={() => onViewChange('table')} aria-label="Table view">
          <FiList />
        </button>
        <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => onViewChange('grid')} aria-label="Grid view">
          <FiGrid />
        </button>
      </div>
      <button type="button" className="primary-button" onClick={onCreate}>
        <FiPlus /> Add Gallery Item
      </button>
    </div>
  </section>
)

export default GalleryToolbar
