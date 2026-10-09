const SaveBar = ({ isDirty, isSaving, onReset, onSave }) => (
  <aside className="publish-bar glass-panel settings-save-bar">
    <div>
      <span>{isDirty ? 'Unsaved changes' : 'Settings saved'}</span>
      <strong>{isDirty ? 'Review and save your website configuration.' : 'Your website settings are up to date.'}</strong>
    </div>
    <div className="publish-actions">
      <button type="button" className="secondary-button" onClick={onReset} disabled={!isDirty || isSaving}>
        Reset Changes
      </button>
      <button type="button" className="primary-button" onClick={onSave} disabled={!isDirty || isSaving}>
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  </aside>
)

export default SaveBar
