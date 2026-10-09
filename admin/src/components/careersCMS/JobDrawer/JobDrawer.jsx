import { FiX } from 'react-icons/fi'
import JobForm from '../JobForm'

const JobDrawer = ({ isOpen, mode, job, isSaving, onClose, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="gallery-drawer" role="dialog" aria-modal="true" aria-labelledby="job-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="gallery-drawer-header">
          <div>
            <p>{mode === 'create' ? 'New Job' : 'Edit Job'}</p>
            <h2 id="job-drawer-title">{mode === 'create' ? 'Create Job Opening' : job?.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close job drawer">
            <FiX />
          </button>
        </header>
        <JobForm initialValues={job} isSaving={isSaving} onCancel={onClose} onSubmit={onSubmit} />
      </aside>
    </div>
  )
}

export default JobDrawer
