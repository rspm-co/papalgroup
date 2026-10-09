import { FiAlertTriangle, FiX } from 'react-icons/fi'

const DeleteMediaDialog = ({ media, isDeleting, onCancel, onConfirm }) => {
  if (!media) return null

  return (
    <div className="media-modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <section className="media-modal delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-media-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="media-modal-header">
          <div>
            <p>Permanent action</p>
            <h2 id="delete-media-title">Delete media asset?</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close delete dialog">
            <FiX />
          </button>
        </div>
        <div className="delete-warning">
          <FiAlertTriangle />
          <p>This will remove <strong>{media.fileName}</strong> from the media library and Cloudinary. CMS entries referencing this asset may need to be updated.</p>
        </div>
        <div className="media-modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={() => onConfirm(media)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Asset'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteMediaDialog
