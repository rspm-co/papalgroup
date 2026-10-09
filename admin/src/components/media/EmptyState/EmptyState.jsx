const EmptyState = ({ onUpload }) => (
  <section className="media-state">
    <h2>No media assets found</h2>
    <p>Upload your first image to start building the website media library.</p>
    <button type="button" className="primary-button" onClick={onUpload}>
      Upload Media
    </button>
  </section>
)

export default EmptyState
