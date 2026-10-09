import { FiX } from 'react-icons/fi'
import AwardsForm from '../AwardsForm'

const AwardsDrawer = ({ isOpen, mode, award, isSaving, onClose, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="gallery-drawer" role="dialog" aria-modal="true" aria-labelledby="awards-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="gallery-drawer-header">
          <div>
            <p>{mode === 'create' ? 'New Award' : 'Edit Award'}</p>
            <h2 id="awards-drawer-title">{mode === 'create' ? 'Create Award Entry' : award?.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close awards drawer">
            <FiX />
          </button>
        </header>
        <AwardsForm initialValues={award} isSaving={isSaving} onCancel={onClose} onSubmit={onSubmit} />
      </aside>
    </div>
  )
}

export default AwardsDrawer
