import { useState } from 'react'
import { FiImage, FiPlus, FiX } from 'react-icons/fi'
import { MediaPickerModal } from '../../media'
import { getMediaUrl } from '../../../constants/media.js'

const getId = (media) => media?._id || media?.id

const GalleryMediaSelector = ({ label, selected = [], multiple = true, onChange, error }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const removeMedia = (mediaId) => {
    onChange(selected.filter((media) => getId(media) !== mediaId))
  }

  return (
    <div className="gallery-media-selector">
      <div className="selector-heading">
        <label>{label}</label>
        <button type="button" className="secondary-button" onClick={() => setIsPickerOpen(true)}>
          <FiPlus /> Select Media
        </button>
      </div>

      {selected.length === 0 ? (
        <button type="button" className="media-select-empty" onClick={() => setIsPickerOpen(true)}>
          <FiImage />
          Choose image assets from the Media Library
        </button>
      ) : (
        <div className="selected-media-grid">
          {selected.map((media) => (
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
        selected={selected}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={(items) => {
          onChange(multiple ? items : items.slice(0, 1))
          setIsPickerOpen(false)
        }}
      />
    </div>
  )
}

export default GalleryMediaSelector
