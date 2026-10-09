import { EditorSection, Field, ToggleField, requiredRule } from './editorFields.jsx'

export const SectionEditor = ({
  eyebrow,
  title,
  description,
  fieldName,
  register,
  errors,
}) => (
  <EditorSection eyebrow={eyebrow} title={title} description={description}>
    <div className="cms-grid two align-end">
      <Field label="Title" name={`${fieldName}.title`} register={register} error={errors?.[fieldName]?.title} rules={requiredRule('Title')} maxLength={90} />
      <Field label="Subtitle" name={`${fieldName}.subtitle`} register={register} error={errors?.[fieldName]?.subtitle} rules={requiredRule('Subtitle')} maxLength={180} />
    </div>
    <ToggleField label="Visible on website" name={`${fieldName}.isVisible`} register={register} />
  </EditorSection>
)
