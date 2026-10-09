import SettingsSection from '../SettingsSection'

const BrandingSettings = ({ register }) => (
  <SettingsSection eyebrow="Branding" title="Brand Assets">
    <div className="cms-grid two">
      <label>
        Logo
        <input {...register('logo')} placeholder="Logo media URL or media ID" />
      </label>
      <label>
        Favicon
        <input {...register('favicon')} placeholder="Favicon media URL or media ID" />
      </label>
    </div>
    <div className="cms-grid two">
      <label>
        Primary Brand Color
        <input type="color" className="settings-color-input" {...register('primaryBrandColor')} />
      </label>
      <label>
        Secondary Brand Color
        <input type="color" className="settings-color-input" {...register('secondaryBrandColor')} />
      </label>
    </div>
  </SettingsSection>
)

export default BrandingSettings
