const EmptyState = ({ onCreate }) => (
  <section className="gallery-state empty-gallery-state">
    <h2>No gallery items found</h2>
    <p>Create the first gallery item to start building website albums and event stories.</p>
    <button type="button" className="primary-button" onClick={onCreate}>
      Add Gallery Item
    </button>
  </section>
)

export default EmptyState
