import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { formatFileSize, getMediaUrl } from '../../../constants/media.js'

const MediaTable = ({ items, onPreview, onEdit, onDelete, onCopy }) => (
  <div className="media-table-wrap">
    <table className="media-table">
      <thead>
        <tr>
          <th>File</th>
          <th>Folder</th>
          <th>Size</th>
          <th>Dimensions</th>
          <th>Uploaded</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((media) => (
          <tr key={media._id || media.id}>
            <td>
              <div className="media-file-cell">
                <img src={getMediaUrl(media)} alt={media.alt || media.fileName} loading="lazy" />
                <strong>{media.fileName}</strong>
              </div>
            </td>
            <td>{media.folder}</td>
            <td>{formatFileSize(media.size)}</td>
            <td>{media.width || 0} x {media.height || 0}</td>
            <td>{media.createdAt ? new Date(media.createdAt).toLocaleDateString('en-IN') : '-'}</td>
            <td>
              <div className="media-table-actions">
                <button type="button" onClick={() => onPreview(media)} aria-label="Preview media"><FiEye /></button>
                <button type="button" onClick={() => onCopy(getMediaUrl(media))} aria-label="Copy media URL"><FiCopy /></button>
                <button type="button" onClick={() => onEdit(media)} aria-label="Edit media"><FiEdit3 /></button>
                <button type="button" onClick={() => onDelete(media)} aria-label="Delete media"><FiTrash2 /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default MediaTable
