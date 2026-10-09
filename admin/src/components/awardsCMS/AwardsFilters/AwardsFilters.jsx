import { awardCategories, awardSortOptions, awardStatuses } from '../../../constants/awards.js'

const AwardsFilters = ({ filters, onChange }) => (
  <div className="gallery-filters awards-filters">
    <label>
      Brand
      <input
        value={filters.brand}
        onChange={(event) => onChange({ brand: event.target.value })}
        placeholder="Brand ID or name"
      />
    </label>
    <label>
      Category
      <select value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
        <option value="">All categories</option>
        {awardCategories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </label>
    <label>
      Year
      <input
        type="number"
        min="1900"
        max="2100"
        value={filters.year}
        onChange={(event) => onChange({ year: event.target.value })}
        placeholder="2026"
      />
    </label>
    <label>
      Status
      <select value={filters.status} onChange={(event) => onChange({ status: event.target.value })}>
        <option value="">All statuses</option>
        {awardStatuses.map((status) => (
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
        {awardSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)

export default AwardsFilters
