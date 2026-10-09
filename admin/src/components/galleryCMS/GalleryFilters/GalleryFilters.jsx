import { galleryCategories, gallerySortOptions, galleryStatuses } from '../../../constants/gallery.js'

const GalleryFilters = ({ filters, onChange }) => (
  <div className="gallery-filters">
    <label>
      Category
      <select value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
        <option value="">All categories</option>
        {galleryCategories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </label>
    <label>
      Status
      <select value={filters.status} onChange={(event) => onChange({ status: event.target.value })}>
        <option value="">All statuses</option>
        {galleryStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </label>
    <label>
      Featured
      <select value={filters.featured} onChange={(event) => onChange({ featured: event.target.value })}>
        <option value="">All</option>
        <option value="true">Featured</option>
        <option value="false">Not featured</option>
      </select>
    </label>
    <label>
      Sort
      <select value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
        {gallerySortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)

export default GalleryFilters
