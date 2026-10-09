import { FiRefreshCw, FiSave } from 'react-icons/fi'

const SettingsToolbar = ({ isDirty, isSaving, onReset, onSave }) => (
  <section className="settings-toolbar">
    <div>
      <p>Website Settings</p>
      <strong>{isDirty ? 'Unsaved changes' : 'All changes saved'}</strong>
    </div>
    <div>
      <button type="button" className="secondary-button" onClick={onReset} disabled={!isDirty || isSaving}>
        <FiRefreshCw /> Reset Changes
      </button>
      <button type="button" className="primary-button" onClick={onSave} disabled={!isDirty || isSaving}>
        <FiSave /> {isSaving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  </section>
)

export default SettingsToolbar
