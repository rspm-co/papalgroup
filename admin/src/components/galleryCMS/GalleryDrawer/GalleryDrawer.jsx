import { FiX } from 'react-icons/fi'
import GalleryForm from '../GalleryForm'

const GalleryDrawer = ({ isOpen, mode, item, isSaving, onClose, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="gallery-drawer" role="dialog" aria-modal="true" aria-labelledby="gallery-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="gallery-drawer-header">
          <div>
            <p>{mode === 'create' ? 'New Gallery Item' : 'Edit Gallery Item'}</p>
            <h2 id="gallery-drawer-title">{mode === 'create' ? 'Create Gallery Story' : item?.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close gallery drawer">
            <FiX />
          </button>
        </header>
        <GalleryForm initialValues={item} isSaving={isSaving} onCancel={onClose} onSubmit={onSubmit} />
      </aside>
    </div>
  )
}

export default GalleryDrawer
