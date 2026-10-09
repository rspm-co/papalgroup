import { EditorSection, Field, TextArea, imageUrlRule, requiredRule } from '../editorFields.jsx'

const CTAEditor = ({ register, errors }) => (
  <EditorSection eyebrow="Section 8" title="CTA" description="Manage the final homepage call-to-action.">
    <Field label="Heading" name="cta.title" register={register} error={errors.cta?.title} rules={requiredRule('Heading')} maxLength={100} />
    <TextArea label="Description" name="cta.description" register={register} error={errors.cta?.description} rules={requiredRule('Description')} maxLength={300} />
    <div className="cms-grid two">
      <Field label="Primary Button Text" name="cta.primaryButton.text" register={register} error={errors.cta?.primaryButton?.text} rules={requiredRule('Primary button text')} maxLength={50} />
      <Field label="Primary Button Link" name="cta.primaryButton.link" register={register} error={errors.cta?.primaryButton?.link} rules={requiredRule('Primary button link')} maxLength={120} />
      <Field label="Secondary Button Text" name="cta.secondaryButton.text" register={register} error={errors.cta?.secondaryButton?.text} rules={requiredRule('Secondary button text')} maxLength={50} />
      <Field label="Secondary Button Link" name="cta.secondaryButton.link" register={register} error={errors.cta?.secondaryButton?.link} rules={requiredRule('Secondary button link')} maxLength={120} />
    </div>
    <Field label="Background Image" name="cta.backgroundImage" register={register} error={errors.cta?.backgroundImage} rules={{ ...requiredRule('Background image'), ...imageUrlRule }} placeholder="https://..." />
  </EditorSection>
)

export default CTAEditor
