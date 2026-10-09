import { SectionEditor } from '../sectionEditorFactory.jsx'

const AwardsEditor = ({ register, errors }) => (
  <SectionEditor
    eyebrow="Section 6"
    title="Awards Section"
    description="Manage awards showcase heading and visibility."
    fieldName="awardsSection"
    register={register}
    errors={errors}
  />
)

export default AwardsEditor
