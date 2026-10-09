import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { employmentTypes, jobStatuses, workModes } from '../../../constants/careers.js'
import JobSEO from '../JobSEO'

const defaultValues = {
  title: '',
  slug: '',
  department: '',
  location: '',
  employmentType: 'Full Time',
  workMode: 'On Site',
  experience: '',
  salary: '',
  vacancies: 1,
  description: '',
  responsibilitiesText: '',
  requirementsText: '',
  skillsText: '',
  benefitsText: '',
  applicationDeadline: '',
  featured: false,
  status: 'Draft',
  displayOrder: 0,
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
  },
}

const JobForm = ({ initialValues, isSaving, onCancel, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues, mode: 'onBlur' })

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues })
  }, [initialValues, reset])

  useEffect(() => {
    if (!isDirty) return undefined
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  return (
    <form className="gallery-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <section className="gallery-form-section">
        <div>
          <p>Job Content</p>
          <h3>Opening Details</h3>
        </div>
        <div className="cms-grid two">
          <label>
            Job Title
            <input {...register('title', { required: 'Job title is required', maxLength: 140 })} placeholder="Marketing Executive" />
            {errors.title && <span className="field-error">{errors.title.message}</span>}
          </label>
          <label>
            Slug
            <input {...register('slug', { required: 'Slug is required', pattern: { value: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens only' } })} placeholder="marketing-executive" />
            {errors.slug && <span className="field-error">{errors.slug.message}</span>}
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Department
            <input {...register('department', { required: 'Department is required', maxLength: 100 })} placeholder="Marketing" />
            {errors.department && <span className="field-error">{errors.department.message}</span>}
          </label>
          <label>
            Location
            <input {...register('location', { required: 'Location is required', maxLength: 120 })} placeholder="Pune, Maharashtra" />
            {errors.location && <span className="field-error">{errors.location.message}</span>}
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Employment Type
            <select {...register('employmentType', { required: 'Employment type is required' })}>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Work Mode
            <select {...register('workMode', { required: 'Work mode is required' })}>
              {workModes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Experience
            <input {...register('experience')} placeholder="2-4 years" />
          </label>
          <label>
            Salary
            <input {...register('salary')} placeholder="As per industry standard" />
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Vacancies
            <input type="number" min="1" {...register('vacancies', { required: 'Vacancies are required', valueAsNumber: true, min: { value: 1, message: 'Add at least one vacancy' } })} />
            {errors.vacancies && <span className="field-error">{errors.vacancies.message}</span>}
          </label>
          <label>
            Application Deadline
            <input type="date" {...register('applicationDeadline', { required: 'Application deadline is required' })} />
            {errors.applicationDeadline && <span className="field-error">{errors.applicationDeadline.message}</span>}
          </label>
        </div>
        <label>
          Description
          <textarea rows="4" {...register('description', { required: 'Description is required', maxLength: 1200 })} placeholder="Describe the role and opportunity" />
          {errors.description && <span className="field-error">{errors.description.message}</span>}
        </label>
      </section>

      <section className="gallery-form-section">
        <div>
          <p>Role Structure</p>
          <h3>Responsibilities & Requirements</h3>
        </div>
        <label>
          Responsibilities
          <textarea rows="5" {...register('responsibilitiesText')} placeholder="Write one responsibility per line" />
        </label>
        <label>
          Requirements
          <textarea rows="5" {...register('requirementsText')} placeholder="Write one requirement per line" />
        </label>
        <label>
          Skills
          <textarea rows="4" {...register('skillsText')} placeholder="Write one skill per line" />
        </label>
        <label>
          Benefits
          <textarea rows="4" {...register('benefitsText')} placeholder="Write one benefit per line" />
        </label>
      </section>

      <section className="gallery-form-section">
        <div>
          <p>Publishing</p>
          <h3>Status & Ordering</h3>
        </div>
        <div className="cms-grid two">
          <label>
            Status
            <select {...register('status')}>
              {jobStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label>
            Display Order
            <input type="number" min="0" {...register('displayOrder', { valueAsNumber: true })} />
          </label>
        </div>
        <label className="cms-toggle">
          <input type="checkbox" {...register('featured')} />
          Featured job
        </label>
      </section>

      <JobSEO register={register} />

      <div className="gallery-drawer-actions">
        <button type="button" className="secondary-button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
        <button type="submit" className="primary-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Job'}
        </button>
      </div>
    </form>
  )
}

export default JobForm
