import { urlPattern } from '../../../constants/settings.js'
import SettingsSection from '../SettingsSection'

const socialFields = ['facebook', 'instagram', 'linkedin', 'youtube', 'twitter']

const SocialLinks = ({ register, errors }) => (
  <SettingsSection eyebrow="Social" title="Social Media">
    <div className="cms-grid two">
      {socialFields.map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <input {...register(`socialLinks.${field}`, { pattern: urlPattern })} placeholder={`https://${field}.com/rspapalgroup`} />
          {errors.socialLinks?.[field] && <span className="field-error">{errors.socialLinks[field].message}</span>}
        </label>
      ))}
    </div>
  </SettingsSection>
)

export default SocialLinks
