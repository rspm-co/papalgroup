import { mediaFolders, mediaSortOptions } from '../../../constants/media.js'

const MediaFilters = ({ filters, onChange }) => (
  <div className="media-filters">
    <label>
      Folder
      <select value={filters.folder} onChange={(event) => onChange({ folder: event.target.value })}>
        <option value="">All folders</option>
        {mediaFolders.map((folder) => (
          <option key={folder} value={folder}>{folder}</option>
        ))}
      </select>
    </label>
    <label>
      Tags
      <input
        type="search"
        value={filters.tags}
        onChange={(event) => onChange({ tags: event.target.value })}
        placeholder="brand, homepage"
      />
    </label>
    <label>
      Sort
      <select value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
        {mediaSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
)

export default MediaFilters
