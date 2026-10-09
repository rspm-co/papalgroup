import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiCheck, FiSearch, FiX } from 'react-icons/fi'
import { getMediaLibrary } from '../../../services/media.js'
import { getMediaUrl, mediaFolders } from '../../../constants/media.js'
import LoadingState from '../LoadingState'
import EmptyState from '../EmptyState'

const getId = (media) => media?._id || media?.id

const MediaPickerModal = ({ isOpen, multiple = false, selected = [], onClose, onConfirm }) => {
  const [filters, setFilters] = useState({ search: '', folder: '' })
  const [selectedItems, setSelectedItems] = useState(selected)

  const selectedIds = useMemo(() => selectedItems.map(getId), [selectedItems])

  const mediaQuery = useQuery({
    queryKey: ['media-picker', filters],
    queryFn: () => getMediaLibrary(filters),
    enabled: isOpen,
  })

  const items = mediaQuery.data?.items || mediaQuery.data?.media || mediaQuery.data?.docs || []

  const toggleMedia = (media) => {
    const mediaId = getId(media)
    if (multiple) {
      setSelectedItems((currentItems) =>
        currentItems.some((item) => getId(item) === mediaId)
          ? currentItems.filter((item) => getId(item) !== mediaId)
          : [...currentItems, media],
      )
      return
    }
    setSelectedItems([media])
  }

  if (!isOpen) return null

  return (
    <div className="media-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="media-modal media-picker" role="dialog" aria-modal="true" aria-labelledby="media-picker-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="media-modal-header">
          <div>
            <p>Media Library</p>
            <h2 id="media-picker-title">Select media</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close media picker">
            <FiX />
          </button>
        </div>

        <div className="media-picker-filters">
          <label>
            Search
            <span>
              <FiSearch />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                placeholder="Search media..."
              />
            </span>
          </label>
          <label>
            Folder
            <select value={filters.folder} onChange={(event) => setFilters((current) => ({ ...current, folder: event.target.value }))}>
              <option value="">All folders</option>
              {mediaFolders.map((folder) => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </label>
        </div>

        {mediaQuery.isLoading && <LoadingState label="Loading media assets..." />}
        {mediaQuery.isError && (
          <section className="media-state error-state" role="alert">
            <h2>Unable to load media</h2>
            <p>{mediaQuery.error?.response?.data?.message || 'Please try again.'}</p>
          </section>
        )}
        {!mediaQuery.isLoading && !mediaQuery.isError && items.length === 0 && <EmptyState onUpload={onClose} />}
        {!mediaQuery.isLoading && !mediaQuery.isError && items.length > 0 && (
          <div className="media-picker-grid">
            {items.map((media) => {
              const mediaId = getId(media)
              const isSelected = selectedIds.includes(mediaId)
              return (
                <button
                  type="button"
                  key={mediaId}
                  className={`media-picker-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleMedia(media)}
                  aria-pressed={isSelected}
                >
                  <img src={getMediaUrl(media)} alt={media.alt || media.fileName} loading="lazy" />
                  <span>{media.fileName}</span>
                  {isSelected && <FiCheck />}
                </button>
              )
            })}
          </div>
        )}

        <div className="media-modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="primary-button" onClick={() => onConfirm(selectedItems)} disabled={!selectedItems.length}>
            Use Selected
          </button>
        </div>
      </section>
    </div>
  )
}

export default MediaPickerModal
