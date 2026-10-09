import { SectionEditor } from '../sectionEditorFactory.jsx'

const MomentsEditor = ({ register, errors }) => (
  <SectionEditor
    eyebrow="Section 5"
    title="Moments Section"
    description="Manage gallery storytelling section heading and visibility."
    fieldName="momentsSection"
    register={register}
    errors={errors}
  />
)

export default MomentsEditor
