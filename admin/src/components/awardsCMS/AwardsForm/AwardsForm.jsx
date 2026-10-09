import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { awardCategories, awardStatuses } from '../../../constants/awards.js'
import AwardsMediaSelector from '../AwardsMediaSelector'
import AwardsSEO from '../AwardsSEO'

const defaultValues = {
  title: '',
  slug: '',
  organization: '',
  awardDate: '',
  year: new Date().getFullYear(),
  description: '',
  brand: '',
  category: 'Business',
  featured: false,
  status: 'Draft',
  displayOrder: 0,
  certificateMedia: null,
  coverMedia: null,
  galleryMedia: [],
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
  },
}

const AwardsForm = ({ initialValues, isSaving, onCancel, onSubmit }) => {
  const {
    control,
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
          <p>Award Content</p>
          <h3>Award Details</h3>
        </div>
        <div className="cms-grid two">
          <label>
            Award Title
            <input {...register('title', { required: 'Award title is required', maxLength: 140 })} placeholder="Startup Excellence Award" />
            {errors.title && <span className="field-error">{errors.title.message}</span>}
          </label>
          <label>
            Slug
            <input {...register('slug', { required: 'Slug is required', pattern: { value: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens only' } })} placeholder="startup-excellence-award" />
            {errors.slug && <span className="field-error">{errors.slug.message}</span>}
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Organization
            <input {...register('organization', { required: 'Organization is required', maxLength: 120 })} placeholder="Awarding organization" />
            {errors.organization && <span className="field-error">{errors.organization.message}</span>}
          </label>
          <label>
            Award Date
            <input type="date" {...register('awardDate', { required: 'Award date is required' })} />
            {errors.awardDate && <span className="field-error">{errors.awardDate.message}</span>}
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Year
            <input type="number" min="1900" max="2100" {...register('year', { required: 'Year is required', valueAsNumber: true })} />
            {errors.year && <span className="field-error">{errors.year.message}</span>}
          </label>
          <label>
            Brand
            <input {...register('brand')} placeholder="Brand ID or related brand" />
          </label>
        </div>
        <label>
          Description
          <textarea rows="4" {...register('description', { required: 'Description is required', maxLength: 900 })} placeholder="Describe this recognition" />
          {errors.description && <span className="field-error">{errors.description.message}</span>}
        </label>
        <div className="cms-grid two">
          <label>
            Category
            <select {...register('category', { required: 'Category is required' })}>
              {awardCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select {...register('status')}>
              {awardStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="cms-grid two">
          <label>
            Display Order
            <input type="number" min="0" {...register('displayOrder', { valueAsNumber: true })} />
          </label>
          <label className="cms-toggle">
            <input type="checkbox" {...register('featured')} />
            Featured award
          </label>
        </div>
      </section>

      <section className="gallery-form-section">
        <div>
          <p>Media</p>
          <h3>Award Assets</h3>
        </div>
        <Controller
          control={control}
          name="coverMedia"
          render={({ field }) => (
            <AwardsMediaSelector label="Cover Image" selected={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="certificateMedia"
          render={({ field }) => (
            <AwardsMediaSelector label="Certificate Image" selected={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="galleryMedia"
          render={({ field }) => (
            <AwardsMediaSelector label="Gallery Images" selected={field.value} multiple onChange={field.onChange} />
          )}
        />
      </section>

      <AwardsSEO register={register} />

      <div className="gallery-drawer-actions">
        <button type="button" className="secondary-button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
        <button type="submit" className="primary-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Award'}
        </button>
      </div>
    </form>
  )
}

export default AwardsForm
