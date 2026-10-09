const ErrorState = ({ message, onRetry }) => (
  <section className="gallery-state error-state" role="alert">
    <h2>Unable to load settings</h2>
    <p>{message || 'Please try again.'}</p>
    <button type="button" className="primary-button" onClick={onRetry}>
      Try Again
    </button>
  </section>
)

export default ErrorState
