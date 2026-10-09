const EmptyState = ({ onCreate }) => (
  <section className="gallery-state empty-gallery-state">
    <h2>No jobs found</h2>
    <p>Add the first opening to start building the careers pipeline.</p>
    <button type="button" className="primary-button" onClick={onCreate}>
      Add Job
    </button>
  </section>
)

export default EmptyState
