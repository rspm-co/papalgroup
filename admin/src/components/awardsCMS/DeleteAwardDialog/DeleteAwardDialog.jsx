import { FiAlertTriangle, FiX } from 'react-icons/fi'

const DeleteAwardDialog = ({ award, isDeleting, onCancel, onConfirm }) => {
  if (!award) return null

  return (
    <div className="gallery-dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="gallery-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-award-title" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <p>Soft Delete</p>
            <h2 id="delete-award-title">Delete award?</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close delete dialog">
            <FiX />
          </button>
        </header>
        <div className="delete-warning">
          <FiAlertTriangle />
          <p><strong>{award.title}</strong> will be removed from the active CMS list. This does not delete media assets.</p>
        </div>
        <div className="gallery-drawer-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={() => onConfirm(award)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Award'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteAwardDialog
