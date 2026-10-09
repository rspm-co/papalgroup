import ExportButton from '../ExportButton'
import LeadFilters from '../LeadFilters'

const LeadToolbar = ({ filters, leads, onChange }) => (
  <section className="gallery-toolbar leads-toolbar">
    <label className="gallery-search">
      Search
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search name, email, phone, company or city..."
      />
    </label>
    <LeadFilters filters={filters} onChange={onChange} />
    <div className="gallery-toolbar-actions">
      <ExportButton leads={leads} />
    </div>
  </section>
)

export default LeadToolbar
