import { useState } from 'react'
import { FiImage, FiPlus, FiX } from 'react-icons/fi'
import { MediaPickerModal } from '../../media'
import { getMediaUrl } from '../../../constants/media.js'

const getId = (media) => media?._id || media?.id

const AwardsMediaSelector = ({ label, selected = [], multiple = false, onChange, error }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const selectedItems = Array.isArray(selected) ? selected.filter(Boolean) : selected ? [selected] : []

  const removeMedia = (mediaId) => {
    const nextItems = selectedItems.filter((media) => getId(media) !== mediaId)
    onChange(multiple ? nextItems : null)
  }

  return (
    <div className="gallery-media-selector">
      <div className="selector-heading">
        <label>{label}</label>
        <button type="button" className="secondary-button" onClick={() => setIsPickerOpen(true)}>
          <FiPlus /> Select Media
        </button>
      </div>

      {selectedItems.length === 0 ? (
        <button type="button" className="media-select-empty" onClick={() => setIsPickerOpen(true)}>
          <FiImage />
          Choose image assets from the Media Library
        </button>
      ) : (
        <div className="selected-media-grid">
          {selectedItems.map((media) => (
            <figure key={getId(media)}>
              <img src={getMediaUrl(media)} alt={media.alt || media.fileName} loading="lazy" />
              <figcaption>{media.fileName}</figcaption>
              <button type="button" onClick={() => removeMedia(getId(media))} aria-label={`Remove ${media.fileName}`}>
                <FiX />
              </button>
            </figure>
          ))}
        </div>
      )}

      {error && <span className="field-error">{error.message}</span>}

      <MediaPickerModal
        isOpen={isPickerOpen}
        multiple={multiple}
        selected={selectedItems}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={(items) => {
          onChange(multiple ? items : items[0] || null)
          setIsPickerOpen(false)
        }}
      />
    </div>
  )
}

export default AwardsMediaSelector
