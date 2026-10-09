const SettingsSection = ({ eyebrow, title, children }) => (
  <section className="settings-card">
    <div className="settings-card-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
    {children}
  </section>
)

export default SettingsSection
