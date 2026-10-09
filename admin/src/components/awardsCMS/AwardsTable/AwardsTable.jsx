import { FiCopy, FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { getAwardBrandName, getAwardCover } from '../../../constants/awards.js'
import { getMediaUrl } from '../../../constants/media.js'
import StatusBadge from '../StatusBadge'

const AwardsTable = ({ items, onPreview, onEdit, onDelete, onDuplicate }) => (
  <div className="gallery-table-wrap">
    <table className="gallery-table awards-table">
      <thead>
        <tr>
          <th>Cover Image</th>
          <th>Award Title</th>
          <th>Organization</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Award Year</th>
          <th>Featured</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((award) => {
          const cover = getAwardCover(award)
          return (
            <tr key={award._id || award.id}>
              <td>
                <div className="gallery-cover-thumb">
                  {cover ? <img src={getMediaUrl(cover)} alt={cover.alt || award.title} loading="lazy" /> : <span>No image</span>}
                </div>
              </td>
              <td>
                <strong>{award.title}</strong>
                <small>{award.slug}</small>
              </td>
              <td>{award.organization}</td>
              <td>{getAwardBrandName(award.brand)}</td>
              <td>{award.category}</td>
              <td>{award.year || (award.awardDate ? new Date(award.awardDate).getFullYear() : '-')}</td>
              <td>{award.featured ? 'Yes' : 'No'}</td>
              <td><StatusBadge status={award.status} /></td>
              <td>
                <div className="gallery-actions">
                  <button type="button" onClick={() => onPreview(award)} aria-label={`Preview ${award.title}`}><FiEye /></button>
                  <button type="button" onClick={() => onEdit(award)} aria-label={`Edit ${award.title}`}><FiEdit3 /></button>
                  <button type="button" onClick={() => onDuplicate(award)} aria-label={`Duplicate ${award.title}`}><FiCopy /></button>
                  <button type="button" onClick={() => onDelete(award)} aria-label={`Delete ${award.title}`}><FiTrash2 /></button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default AwardsTable
