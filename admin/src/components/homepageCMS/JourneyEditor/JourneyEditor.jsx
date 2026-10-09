import { useFieldArray } from 'react-hook-form'
import { FiArrowDown, FiArrowUp, FiPlus, FiTrash2 } from 'react-icons/fi'
import { EditorSection, Field, TextArea, imageUrlRule, requiredRule } from '../editorFields.jsx'

const emptyJourney = {
  year: '',
  title: '',
  description: '',
  image: '',
  displayOrder: 0,
}

const JourneyEditor = ({ control, register, errors }) => {
  const { fields, append, remove, move } = useFieldArray({ control, name: 'journey' })

  return (
    <EditorSection eyebrow="Section 2" title="Journey Editor" description="Build and reorder the homepage timeline.">
      <div className="cms-array-list">
        {fields.map((field, index) => (
          <article className="cms-array-item" key={field.id}>
            <div className="cms-array-toolbar">
              <strong>Milestone {index + 1}</strong>
              <div>
                <button type="button" onClick={() => index > 0 && move(index, index - 1)} aria-label="Move milestone up"><FiArrowUp /></button>
                <button type="button" onClick={() => index < fields.length - 1 && move(index, index + 1)} aria-label="Move milestone down"><FiArrowDown /></button>
                <button type="button" onClick={() => remove(index)} aria-label="Delete milestone"><FiTrash2 /></button>
              </div>
            </div>
            <div className="cms-grid two">
              <Field label="Year" name={`journey.${index}.year`} register={register} error={errors.journey?.[index]?.year} rules={requiredRule('Year')} maxLength={20} />
              <Field label="Title" name={`journey.${index}.title`} register={register} error={errors.journey?.[index]?.title} rules={requiredRule('Title')} maxLength={90} />
              <Field label="Image" name={`journey.${index}.image`} register={register} error={errors.journey?.[index]?.image} rules={{ ...requiredRule('Image'), ...imageUrlRule }} placeholder="https://..." />
              <Field label="Order" type="number" name={`journey.${index}.displayOrder`} register={register} error={errors.journey?.[index]?.displayOrder} rules={{ valueAsNumber: true }} />
            </div>
            <TextArea label="Description" name={`journey.${index}.description`} register={register} error={errors.journey?.[index]?.description} rules={requiredRule('Description')} maxLength={220} />
          </article>
        ))}
      </div>
      <button type="button" className="secondary-button" onClick={() => append({ ...emptyJourney, displayOrder: fields.length })}>
        <FiPlus /> Add Milestone
      </button>
    </EditorSection>
  )
}

export default JourneyEditor
