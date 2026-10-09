import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiCopy, FiX } from 'react-icons/fi'
import { formatFileSize, getMediaUrl, mediaFolders } from '../../../constants/media.js'

const MediaDetailsDrawer = ({ media, isSaving, onClose, onCopy, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      alt: '',
      tags: '',
      folder: 'General',
    },
  })

  useEffect(() => {
    if (media) {
      reset({
        alt: media.alt || '',
        tags: Array.isArray(media.tags) ? media.tags.join(', ') : media.tags || '',
        folder: media.folder || 'General',
      })
    }
  }, [media, reset])

  if (!media) return null

  return (
    <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="gallery-drawer media-details-drawer" role="dialog" aria-modal="true" aria-labelledby="media-details-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="gallery-drawer-header">
          <div>
            <p>Media Details</p>
            <h2 id="media-details-title">{media.fileName}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close media details">
            <FiX />
          </button>
        </header>

        <form className="gallery-form" onSubmit={handleSubmit(onSave)} noValidate>
          <section className="lead-panel">
            <img className="media-details-preview" src={getMediaUrl(media)} alt={media.alt || media.fileName} />
            <div className="lead-detail-grid">
              <span>Original Name</span><strong>{media.originalName || '-'}</strong>
              <span>Dimensions</span><strong>{media.width || 0} x {media.height || 0}</strong>
              <span>Size</span><strong>{formatFileSize(media.size)}</strong>
              <span>Type</span><strong>{media.mimeType || media.extension || '-'}</strong>
              <span>Media ID</span><strong>{media._id || media.id}</strong>
            </div>
          </section>

          <section className="lead-panel">
            <div>
              <p>Metadata</p>
              <h3>Asset Details</h3>
            </div>
            <label>
              Alt Text
              <input {...register('alt')} placeholder="Describe the image" />
            </label>
            <label>
              Tags
              <input {...register('tags')} placeholder="homepage, award, brand" />
            </label>
            <label>
              Folder
              <select {...register('folder')}>
                {mediaFolders.map((folder) => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
              </select>
            </label>
          </section>

          <div className="gallery-drawer-actions">
            <button type="button" className="secondary-button" onClick={() => onCopy(getMediaUrl(media))}>
              <FiCopy /> Copy URL
            </button>
            <button type="button" className="secondary-button" onClick={() => onCopy(media._id || media.id)}>
              <FiCopy /> Copy Media ID
            </button>
            <button type="submit" className="primary-button" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Media'}
            </button>
          </div>
        </form>
      </aside>
    </div>
  )
}

export default MediaDetailsDrawer
