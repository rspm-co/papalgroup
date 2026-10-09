import { EditorSection, Field, TextArea, imageUrlRule } from '../editorFields.jsx'

const SEOEditor = ({ register, errors }) => (
  <EditorSection eyebrow="Section 9" title="SEO" description="Control homepage metadata for search and social previews.">
    <div className="cms-grid two">
      <Field label="Meta Title" name="seo.metaTitle" register={register} error={errors.seo?.metaTitle} maxLength={70} />
      <Field label="Keywords" name="seo.keywords" register={register} error={errors.seo?.keywords} placeholder="brand, franchise, business" maxLength={160} />
    </div>
    <TextArea label="Meta Description" name="seo.metaDescription" register={register} error={errors.seo?.metaDescription} maxLength={180} rows={3} />
    <Field label="OG Image" name="seo.ogImage" register={register} error={errors.seo?.ogImage} rules={imageUrlRule} placeholder="https://..." />
  </EditorSection>
)

export default SEOEditor
