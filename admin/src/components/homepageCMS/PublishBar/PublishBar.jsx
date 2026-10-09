import PreviewButton from '../PreviewButton'

const PublishBar = ({
  status,
  isSaving,
  isDirty,
  autoSaveStatus,
  onSaveDraft,
  onPublish,
}) => (
  <aside className="publish-bar" aria-label="Homepage publishing controls">
    <div>
      <p>Status</p>
      <strong>{status}</strong>
      <span>{autoSaveStatus || (isDirty ? 'Unsaved changes' : 'All changes saved')}</span>
    </div>
    <div className="publish-actions">
      <button type="button" className="secondary-button" onClick={onSaveDraft} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Draft'}
      </button>
      <button type="button" className="primary-button" onClick={onPublish} disabled={isSaving}>
        {isSaving ? 'Publishing...' : 'Publish'}
      </button>
      <PreviewButton />
    </div>
  </aside>
)

export default PublishBar
