import { EditorSection, Field, TextArea, imageUrlRule, requiredRule } from '../editorFields.jsx'

const HeroEditor = ({ register, errors }) => (
  <EditorSection
    eyebrow="Section 1"
    title="Hero Editor"
    description="Manage the first impression visitors see on the public homepage."
  >
    <div className="cms-grid two">
      <Field label="Title" name="hero.title" register={register} error={errors.hero?.title} rules={requiredRule('Title')} maxLength={80} />
      <Field label="Subtitle" name="hero.subtitle" register={register} error={errors.hero?.subtitle} rules={requiredRule('Subtitle')} maxLength={140} />
    </div>
    <TextArea label="Description" name="hero.description" register={register} error={errors.hero?.description} rules={requiredRule('Description')} maxLength={320} />
    <div className="cms-grid two">
      <Field label="Primary Button Text" name="hero.primaryButtonText" register={register} error={errors.hero?.primaryButtonText} rules={requiredRule('Primary button text')} maxLength={40} />
      <Field label="Primary Button Link" name="hero.primaryButtonLink" register={register} error={errors.hero?.primaryButtonLink} rules={requiredRule('Primary button link')} maxLength={120} />
      <Field label="Secondary Button Text" name="hero.secondaryButtonText" register={register} error={errors.hero?.secondaryButtonText} rules={requiredRule('Secondary button text')} maxLength={40} />
      <Field label="Secondary Button Link" name="hero.secondaryButtonLink" register={register} error={errors.hero?.secondaryButtonLink} rules={requiredRule('Secondary button link')} maxLength={120} />
    </div>
    <Field label="Background Image" name="hero.backgroundImage" register={register} error={errors.hero?.backgroundImage} rules={{ ...requiredRule('Background image'), ...imageUrlRule }} placeholder="https://..." />
  </EditorSection>
)

export default HeroEditor
