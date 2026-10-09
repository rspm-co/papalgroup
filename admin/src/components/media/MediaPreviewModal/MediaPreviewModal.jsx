import { FiCopy, FiX } from 'react-icons/fi'
import { formatFileSize, getMediaUrl } from '../../../constants/media.js'

const MediaPreviewModal = ({ media, onClose, onCopy }) => {
  if (!media) return null

  return (
    <div className="media-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="media-modal media-preview" role="dialog" aria-modal="true" aria-labelledby="media-preview-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="media-modal-header">
          <div>
            <p>{media.folder || 'Media Library'}</p>
            <h2 id="media-preview-title">{media.fileName}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close preview">
            <FiX />
          </button>
        </div>
        <img src={getMediaUrl(media)} alt={media.alt || media.fileName} />
        <div className="media-preview-meta">
          <span>{media.width || 0} x {media.height || 0}</span>
          <span>{formatFileSize(media.size)}</span>
          <button type="button" className="secondary-button" onClick={() => onCopy(getMediaUrl(media))}>
            <FiCopy /> Copy URL
          </button>
        </div>
      </section>
    </div>
  )
}

export default MediaPreviewModal
