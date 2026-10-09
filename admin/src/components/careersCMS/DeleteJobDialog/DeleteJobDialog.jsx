import { FiAlertTriangle, FiX } from 'react-icons/fi'

const DeleteJobDialog = ({ job, isDeleting, onCancel, onConfirm }) => {
  if (!job) return null

  return (
    <div className="gallery-dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="gallery-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-job-title" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <p>Soft Delete</p>
            <h2 id="delete-job-title">Delete job opening?</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close delete dialog">
            <FiX />
          </button>
        </header>
        <div className="delete-warning">
          <FiAlertTriangle />
          <p><strong>{job.title}</strong> will be removed from the active careers list.</p>
        </div>
        <div className="gallery-drawer-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={() => onConfirm(job)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Job'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteJobDialog
