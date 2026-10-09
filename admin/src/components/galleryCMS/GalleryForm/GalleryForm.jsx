import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { galleryCategories, galleryStatuses } from '../../../constants/gallery.js'
import GalleryMediaSelector from '../GalleryMediaSelector'
import GallerySEO from '../GallerySEO'

const defaultValues = {
  title: '',
  slug: '',
  category: 'Corporate',
  description: '',
  featured: false,
  status: 'Published',
  displayOrder: 0,
  eventDate: '',
  location: '',
  tags: '',
  mediaItems: [],
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
  },
}

const GalleryForm = ({ initialValues, isSaving, onCancel, onSubmit }) => {
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
          <p>Gallery Content</p>
          <h3>Event Details</h3>
        </div>
        <div className="cms-grid two">
          <label>
            Gallery Title
            <input {...register('title', { required: 'Title is required', maxLength: 120 })} placeholder="Corporate event title" />
            {errors.title && <span className="field-error">{errors.title.message}</span>}
          </label>
          <label>
            Slug
            <input {...register('slug', { required: 'Slug is required', pattern: { value: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens only' } })} placeholder="corporate-event-title" />
            {errors.slug && <span className="field-error">{errors.slug.message}</span>}
          </label>
        </div>
        <label>
          Description
          <textarea rows="4" {...register('description', { required: 'Description is required', maxLength: 800 })} placeholder="Describe this gallery story" />
          {errors.description && <span className="field-error">{errors.description.message}</span>}
        </label>
        <div className="cms-grid two">
          <label>
            Category
            <select {...register('category', { required: 'Category is required' })}>
              {galleryCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select {...register('status')}>
              {galleryStatuses.map((status) => (
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
          <label>
            Event Date
            <input type="date" {...register('eventDate')} />
          </label>
        </div>
        <label>
          Location
          <input {...register('location')} placeholder="City or venue" />
        </label>
        <label>
          Tags
          <input {...register('tags')} placeholder="team, franchise, event" />
        </label>
        <label className="cms-toggle">
          <input type="checkbox" {...register('featured')} />
          Featured gallery item
        </label>
      </section>

      <section className="gallery-form-section">
        <div>
          <p>Media</p>
          <h3>Gallery Images</h3>
        </div>
        <Controller
          control={control}
          name="mediaItems"
          rules={{ validate: (items) => items.length > 0 || 'Select at least one image' }}
          render={({ field }) => (
            <GalleryMediaSelector
              label="Cover and gallery images"
              selected={field.value}
              onChange={field.onChange}
              error={errors.mediaItems}
            />
          )}
        />
      </section>

      <GallerySEO register={register} />

      <div className="gallery-drawer-actions">
        <button type="button" className="secondary-button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
        <button type="submit" className="primary-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Gallery Item'}
        </button>
      </div>
    </form>
  )
}

export default GalleryForm
