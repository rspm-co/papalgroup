import { weekDays } from '../../../constants/settings.js'
import SettingsSection from '../SettingsSection'

const BusinessHours = ({ register }) => (
  <SettingsSection eyebrow="Schedule" title="Business Hours">
    <div className="settings-hours-grid">
      {weekDays.map((day) => (
        <label key={day}>
          {day}
          <input {...register(`businessHours.${day.toLowerCase()}`)} placeholder="10:00 AM - 7:00 PM" />
        </label>
      ))}
    </div>
  </SettingsSection>
)

export default BusinessHours
