import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { formatFileSize, getMediaUrl } from '../../../constants/media.js'

const MediaCard = ({ media, onPreview, onEdit, onDelete, onCopy }) => (
  <article className="media-card">
    <button type="button" className="media-thumb" onClick={() => onPreview(media)} aria-label={`Preview ${media.fileName}`}>
      <img src={getMediaUrl(media)} alt={media.alt || media.originalName || media.fileName} loading="lazy" />
    </button>
    <div className="media-card-body">
      <strong title={media.fileName}>{media.fileName}</strong>
      <span>{media.width || 0} x {media.height || 0} • {formatFileSize(media.size)}</span>
      <small>{media.folder}</small>
    </div>
    <div className="media-actions">
      <button type="button" onClick={() => onPreview(media)} aria-label="Preview media"><FiEye /></button>
      <button type="button" onClick={() => onCopy(getMediaUrl(media))} aria-label="Copy media URL"><FiCopy /></button>
      <button type="button" onClick={() => onEdit(media)} aria-label="Edit media"><FiEdit3 /></button>
      <button type="button" onClick={() => onDelete(media)} aria-label="Delete media"><FiTrash2 /></button>
    </div>
  </article>
)

export default MediaCard
