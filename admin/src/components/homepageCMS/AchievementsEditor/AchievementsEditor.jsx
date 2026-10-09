import { useFieldArray } from 'react-hook-form'
import { FiArrowDown, FiArrowUp, FiPlus, FiTrash2 } from 'react-icons/fi'
import { EditorSection, Field, requiredRule } from '../editorFields.jsx'

const emptyAchievement = {
  title: '',
  value: '',
  suffix: '',
  icon: '',
  displayOrder: 0,
}

const AchievementsEditor = ({ control, register, errors }) => {
  const { fields, append, remove, move } = useFieldArray({ control, name: 'achievements' })

  return (
    <EditorSection eyebrow="Section 3" title="Achievements" description="Manage homepage metric cards.">
      <div className="cms-array-list compact">
        {fields.map((field, index) => (
          <article className="cms-array-item" key={field.id}>
            <div className="cms-array-toolbar">
              <strong>Card {index + 1}</strong>
              <div>
                <button type="button" onClick={() => index > 0 && move(index, index - 1)} aria-label="Move achievement up"><FiArrowUp /></button>
                <button type="button" onClick={() => index < fields.length - 1 && move(index, index + 1)} aria-label="Move achievement down"><FiArrowDown /></button>
                <button type="button" onClick={() => remove(index)} aria-label="Delete achievement"><FiTrash2 /></button>
              </div>
            </div>
            <div className="cms-grid five">
              <Field label="Title" name={`achievements.${index}.title`} register={register} error={errors.achievements?.[index]?.title} rules={requiredRule('Title')} maxLength={70} />
              <Field label="Value" name={`achievements.${index}.value`} register={register} error={errors.achievements?.[index]?.value} rules={requiredRule('Value')} maxLength={20} />
              <Field label="Suffix" name={`achievements.${index}.suffix`} register={register} error={errors.achievements?.[index]?.suffix} rules={requiredRule('Suffix')} maxLength={12} />
              <Field label="Icon" name={`achievements.${index}.icon`} register={register} error={errors.achievements?.[index]?.icon} rules={requiredRule('Icon')} maxLength={40} />
              <Field label="Order" type="number" name={`achievements.${index}.displayOrder`} register={register} error={errors.achievements?.[index]?.displayOrder} rules={{ valueAsNumber: true }} />
            </div>
          </article>
        ))}
      </div>
      <button type="button" className="secondary-button" onClick={() => append({ ...emptyAchievement, displayOrder: fields.length })}>
        <FiPlus /> Add Achievement
      </button>
    </EditorSection>
  )
}

export default AchievementsEditor
