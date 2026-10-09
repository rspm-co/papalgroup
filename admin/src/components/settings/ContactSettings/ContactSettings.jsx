import { emailPattern, phonePattern } from '../../../constants/settings.js'
import SettingsSection from '../SettingsSection'

const ContactSettings = ({ register, errors }) => (
  <SettingsSection eyebrow="Contact" title="Contact Information">
    <div className="cms-grid two">
      <label>
        Primary Email
        <input {...register('primaryEmail', { pattern: emailPattern })} placeholder="info@rspapalgroup.com" />
        {errors.primaryEmail && <span className="field-error">{errors.primaryEmail.message}</span>}
      </label>
      <label>
        Support Email
        <input {...register('supportEmail', { pattern: emailPattern })} placeholder="support@rspapalgroup.com" />
        {errors.supportEmail && <span className="field-error">{errors.supportEmail.message}</span>}
      </label>
    </div>
    <div className="cms-grid two">
      <label>
        Phone
        <input {...register('phone', { pattern: phonePattern })} placeholder="+91 00000 00000" />
        {errors.phone && <span className="field-error">{errors.phone.message}</span>}
      </label>
      <label>
        WhatsApp
        <input {...register('whatsapp', { pattern: phonePattern })} placeholder="+91 00000 00000" />
        {errors.whatsapp && <span className="field-error">{errors.whatsapp.message}</span>}
      </label>
    </div>
  </SettingsSection>
)

export default ContactSettings
