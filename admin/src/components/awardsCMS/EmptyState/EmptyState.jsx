const EmptyState = ({ onCreate }) => (
  <section className="gallery-state empty-gallery-state">
    <h2>No awards found</h2>
    <p>Add the first recognition to start building the corporate awards archive.</p>
    <button type="button" className="primary-button" onClick={onCreate}>
      Add Award
    </button>
  </section>
)

export default EmptyState
