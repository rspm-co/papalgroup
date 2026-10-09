import { FiAlertTriangle, FiX } from 'react-icons/fi'

const DeleteGalleryDialog = ({ item, isDeleting, onCancel, onConfirm }) => {
  if (!item) return null

  return (
    <div className="gallery-dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="gallery-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-gallery-title" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <p>Soft Delete</p>
            <h2 id="delete-gallery-title">Delete gallery item?</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close delete dialog">
            <FiX />
          </button>
        </header>
        <div className="delete-warning">
          <FiAlertTriangle />
          <p><strong>{item.title}</strong> will be removed from the active CMS list. This does not delete media assets.</p>
        </div>
        <div className="gallery-drawer-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={() => onConfirm(item)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Item'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteGalleryDialog
