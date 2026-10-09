import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { getGalleryCover } from '../../../constants/gallery.js'
import { getMediaUrl } from '../../../constants/media.js'
import StatusBadge from '../StatusBadge'

const GalleryGrid = ({ items, onPreview, onEdit, onDelete, onDuplicate }) => (
  <section className="gallery-grid" aria-label="Gallery grid">
    {items.map((item) => {
      const cover = getGalleryCover(item)
      return (
        <article className="gallery-card" key={item._id || item.id}>
          <div className="gallery-card-image">
            {cover ? <img src={getMediaUrl(cover)} alt={cover.alt || item.title} loading="lazy" /> : <span>No image selected</span>}
          </div>
          <div className="gallery-card-body">
            <div>
              <span>{item.category}</span>
              <StatusBadge status={item.status} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-IN') : 'No event date'} · Order {item.displayOrder ?? 0}</small>
          </div>
          <div className="gallery-actions">
            <button type="button" onClick={() => onPreview(item)} aria-label={`Preview ${item.title}`}><FiEye /></button>
            <button type="button" onClick={() => onEdit(item)} aria-label={`Edit ${item.title}`}><FiEdit3 /></button>
            <button type="button" onClick={() => onDuplicate(item)} aria-label={`Duplicate ${item.title}`}><FiCopy /></button>
            <button type="button" onClick={() => onDelete(item)} aria-label={`Delete ${item.title}`}><FiTrash2 /></button>
          </div>
        </article>
      )
    })}
  </section>
)

export default GalleryGrid
