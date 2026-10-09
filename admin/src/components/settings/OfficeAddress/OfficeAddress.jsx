import SettingsSection from '../SettingsSection'

const OfficeAddress = ({ register }) => (
  <SettingsSection eyebrow="Office" title="Office Address">
    <label>
      Address
      <textarea rows="3" {...register('address')} placeholder="Corporate office address" />
    </label>
    <div className="cms-grid two">
      <label>
        City
        <input {...register('city')} placeholder="City" />
      </label>
      <label>
        State
        <input {...register('state')} placeholder="State" />
      </label>
    </div>
    <div className="cms-grid two">
      <label>
        Country
        <input {...register('country')} placeholder="Country" />
      </label>
      <label>
        Postal Code
        <input {...register('postalCode')} placeholder="Postal code" />
      </label>
    </div>
    <label>
      Google Maps Embed
      <textarea rows="3" {...register('googleMapsEmbed')} placeholder="Google Maps embed iframe or URL" />
    </label>
  </SettingsSection>
)

export default OfficeAddress
