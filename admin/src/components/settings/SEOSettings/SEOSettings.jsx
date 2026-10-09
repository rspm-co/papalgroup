import SettingsSection from '../SettingsSection'

const SEOSettings = ({ register }) => (
  <SettingsSection eyebrow="SEO" title="SEO Defaults">
    <label>
      Default Meta Title
      <input {...register('seo.defaultTitle', { maxLength: 70 })} placeholder="R S PAPAL GROUP" />
    </label>
    <label>
      Default Meta Description
      <textarea rows="3" {...register('seo.defaultDescription', { maxLength: 160 })} placeholder="Default website search description" />
    </label>
    <div className="cms-grid two">
      <label>
        Default Keywords
        <input {...register('seo.defaultKeywords')} placeholder="business, brands, franchise" />
      </label>
      <label>
        Default OG Image
        <input {...register('seo.defaultOgImage')} placeholder="Media URL or media ID" />
      </label>
    </div>
  </SettingsSection>
)

export default SEOSettings
