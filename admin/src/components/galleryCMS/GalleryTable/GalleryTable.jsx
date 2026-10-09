import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { getGalleryCover } from '../../../constants/gallery.js'
import { getMediaUrl } from '../../../constants/media.js'
import StatusBadge from '../StatusBadge'

const GalleryTable = ({ items, onPreview, onEdit, onDelete, onDuplicate }) => (
  <div className="gallery-table-wrap">
    <table className="gallery-table">
      <thead>
        <tr>
          <th>Cover Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Display Order</th>
          <th>Event Date</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const cover = getGalleryCover(item)
          return (
            <tr key={item._id || item.id}>
              <td>
                <div className="gallery-cover-thumb">
                  {cover ? <img src={getMediaUrl(cover)} alt={cover.alt || item.title} loading="lazy" /> : <span>No image</span>}
                </div>
              </td>
              <td>
                <strong>{item.title}</strong>
                <small>{item.slug}</small>
              </td>
              <td>{item.category}</td>
              <td>{item.featured ? 'Yes' : 'No'}</td>
              <td><StatusBadge status={item.status} /></td>
              <td>{item.displayOrder ?? 0}</td>
              <td>{item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-IN') : '-'}</td>
              <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('en-IN') : '-'}</td>
              <td>
                <div className="gallery-actions">
                  <button type="button" onClick={() => onPreview(item)} aria-label={`Preview ${item.title}`}><FiEye /></button>
                  <button type="button" onClick={() => onEdit(item)} aria-label={`Edit ${item.title}`}><FiEdit3 /></button>
                  <button type="button" onClick={() => onDuplicate(item)} aria-label={`Duplicate ${item.title}`}><FiCopy /></button>
                  <button type="button" onClick={() => onDelete(item)} aria-label={`Delete ${item.title}`}><FiTrash2 /></button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default GalleryTable
