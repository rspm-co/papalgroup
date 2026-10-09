import SettingsSection from '../SettingsSection'

const MaintenanceSettings = ({ register }) => (
  <SettingsSection eyebrow="Availability" title="Maintenance Mode">
    <label className="cms-toggle">
      <input type="checkbox" {...register('maintenanceMode')} />
      Enable maintenance mode
    </label>
    <label>
      Maintenance Message
      <textarea rows="3" {...register('maintenanceMessage', { maxLength: 240 })} placeholder="We are improving the website. Please check back shortly." />
    </label>
  </SettingsSection>
)

export default MaintenanceSettings
