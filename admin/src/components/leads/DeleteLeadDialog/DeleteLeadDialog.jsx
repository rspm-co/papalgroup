import { FiAlertTriangle, FiX } from 'react-icons/fi'

const DeleteLeadDialog = ({ lead, isDeleting, onCancel, onConfirm }) => {
  if (!lead) return null

  return (
    <div className="gallery-dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="gallery-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-lead-title" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <p>Soft Delete</p>
            <h2 id="delete-lead-title">Delete lead?</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close delete dialog">
            <FiX />
          </button>
        </header>
        <div className="delete-warning">
          <FiAlertTriangle />
          <p><strong>{lead.fullName}</strong> will be removed from the active lead list.</p>
        </div>
        <div className="gallery-drawer-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={() => onConfirm(lead)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteLeadDialog
