import { SectionEditor } from '../sectionEditorFactory.jsx'

const FranchiseProcessEditor = ({ register, errors }) => (
  <SectionEditor
    eyebrow="Section 7"
    title="Franchise Process"
    description="Manage franchise process section heading and visibility."
    fieldName="franchiseProcess"
    register={register}
    errors={errors}
  />
)

export default FranchiseProcessEditor
