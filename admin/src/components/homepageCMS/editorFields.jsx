export const Field = ({
  label,
  name,
  register,
  error,
  type = 'text',
  rules = {},
  maxLength,
  placeholder,
}) => (
  <div className="cms-field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      {...register(name, rules)}
    />
    {error && <small className="field-error">{error.message}</small>}
  </div>
)

export const TextArea = ({
  label,
  name,
  register,
  error,
  rules = {},
  maxLength,
  rows = 4,
  placeholder,
}) => (
  <div className="cms-field">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      rows={rows}
      maxLength={maxLength}
      placeholder={placeholder}
      {...register(name, rules)}
    />
    {error && <small className="field-error">{error.message}</small>}
  </div>
)

export const ToggleField = ({ label, name, register }) => (
  <label className="cms-toggle">
    <input type="checkbox" {...register(name)} />
    <span>{label}</span>
  </label>
)

export const EditorSection = ({ eyebrow, title, description, children }) => (
  <section className="cms-editor-card">
    <div className="cms-editor-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
    {children}
  </section>
)

export const requiredRule = (label) => ({
  required: `${label} is required`,
})

export const imageUrlRule = {
  validate: (value) => {
    if (!value) {
      return true
    }

    return /^https?:\/\/.+\.(png|jpg|jpeg|webp|svg)(\?.*)?$/i.test(value)
      || 'Enter a valid image URL'
  },
}
