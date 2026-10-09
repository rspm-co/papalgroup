import { SectionEditor } from '../sectionEditorFactory.jsx'

const BrandsSectionEditor = ({ register, errors }) => (
  <SectionEditor
    eyebrow="Section 4"
    title="Brands Section"
    description="Manage section heading and visibility."
    fieldName="brandsSection"
    register={register}
    errors={errors}
  />
)

export default BrandsSectionEditor
