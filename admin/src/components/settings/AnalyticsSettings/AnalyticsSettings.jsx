import SettingsSection from '../SettingsSection'

const AnalyticsSettings = ({ register }) => (
  <SettingsSection eyebrow="Tracking" title="Analytics">
    <div className="cms-grid two">
      <label>
        Google Analytics ID
        <input {...register('analytics.googleAnalyticsId')} placeholder="G-XXXXXXXXXX" />
      </label>
      <label>
        Google Tag Manager ID
        <input {...register('analytics.googleTagManagerId')} placeholder="GTM-XXXXXXX" />
      </label>
    </div>
    <label>
      Meta Pixel ID
      <input {...register('analytics.metaPixelId')} placeholder="000000000000000" />
    </label>
  </SettingsSection>
)

export default AnalyticsSettings
