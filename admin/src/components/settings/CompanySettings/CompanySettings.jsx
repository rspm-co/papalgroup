import { urlPattern } from '../../../constants/settings.js'
import SettingsSection from '../SettingsSection'

const CompanySettings = ({ register, errors }) => (
  <SettingsSection eyebrow="Company" title="Company Information">
    <div className="cms-grid two">
      <label>
        Company Name
        <input {...register('companyName', { required: 'Company name is required', maxLength: 120 })} placeholder="R S PAPAL GROUP" />
        {errors.companyName && <span className="field-error">{errors.companyName.message}</span>}
      </label>
      <label>
        Tagline
        <input {...register('tagline', { maxLength: 180 })} placeholder="Building Businesses. Creating Opportunities." />
      </label>
    </div>
    <label>
      Website
      <input {...register('website', { pattern: urlPattern })} placeholder="https://rspapalgroup.com" />
      {errors.website && <span className="field-error">{errors.website.message}</span>}
    </label>
  </SettingsSection>
)

export default CompanySettings
