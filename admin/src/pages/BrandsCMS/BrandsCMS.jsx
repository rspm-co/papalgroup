import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCopy, FiEdit3, FiEye, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { brandCategories, brandSortOptions, brandStatuses, createSlug } from '../../constants/brands.js'
import { createBrand, deleteBrand, getBrands, updateBrand } from '../../services/brands.js'

const emptyBrand = {
  name: '',
  slug: '',
  tagline: '',
  shortDescription: '',
  fullDescription: '',
  category: 'Food',
  website: '',
  logo: '',
  heroImage: '',
  themeColor: '#BB9B50',
  status: 'Draft',
  displayOrder: 0,
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
  },
}

const getId = (brand) => brand?._id || brand?.id || brand
const getItemsFromResponse = (data) => data?.items || data?.brands || data?.docs || data?.results || []

const normalizeBrand = (brand = {}) => ({
  ...emptyBrand,
  ...brand,
  id: getId(brand),
  seo: {
    ...emptyBrand.seo,
    ...brand.seo,
    keywords: Array.isArray(brand.seo?.keywords) ? brand.seo.keywords.join(', ') : brand.seo?.keywords || '',
  },
})

const buildPayload = (values) => ({
  ...values,
  slug: values.slug || createSlug(values.name),
  displayOrder: Number(values.displayOrder || 0),
  seo: {
    ...values.seo,
    keywords: values.seo?.keywords ? values.seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean) : [],
  },
})

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${String(status || 'Draft').toLowerCase()}`}>{status || 'Draft'}</span>
)

const BrandsCMS = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({ search: '', category: '', status: '', sort: 'displayOrder' })
  const [drawerState, setDrawerState] = useState({ isOpen: false, mode: 'create', brand: emptyBrand })
  const [deleteItem, setDeleteItem] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: emptyBrand, mode: 'onBlur' })

  const brandsQuery = useQuery({
    queryKey: ['brands-cms', filters],
    queryFn: () => getBrands(filters),
  })

  const brands = useMemo(() => getItemsFromResponse(brandsQuery.data), [brandsQuery.data])

  useEffect(() => {
    if (drawerState.isOpen) {
      reset(drawerState.brand)
    }
  }, [drawerState, reset])

  useEffect(() => {
    if (!isDirty) return undefined
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success('Brand created successfully')
      setDrawerState({ isOpen: false, mode: 'create', brand: emptyBrand })
      queryClient.invalidateQueries({ queryKey: ['brands-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to create brand'),
  })

  const updateMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: () => {
      toast.success('Brand updated successfully')
      setDrawerState({ isOpen: false, mode: 'create', brand: emptyBrand })
      queryClient.invalidateQueries({ queryKey: ['brands-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update brand'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      toast.success('Brand deleted successfully')
      setDeleteItem(null)
      queryClient.invalidateQueries({ queryKey: ['brands-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete brand'),
  })

  const openCreate = () => setDrawerState({ isOpen: true, mode: 'create', brand: emptyBrand })
  const openEdit = (brand) => setDrawerState({ isOpen: true, mode: 'edit', brand: normalizeBrand(brand) })

  const saveBrand = (values) => {
    const payload = buildPayload(values)
    const brandId = getId(drawerState.brand)
    if (drawerState.mode === 'edit' && brandId) {
      updateMutation.mutate({ id: brandId, payload })
      return
    }
    createMutation.mutate(payload)
  }

  const duplicateBrand = (brand) => {
    const normalized = normalizeBrand(brand)
    createMutation.mutate(buildPayload({
      ...normalized,
      name: `${normalized.name} Copy`,
      slug: `${normalized.slug || createSlug(normalized.name)}-copy-${Date.now()}`,
      status: 'Draft',
      displayOrder: Number(normalized.displayOrder || 0) + 1,
    }))
  }

  return (
    <>
      <Helmet>
        <title>Brands CMS | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="gallery-cms-page brands-cms-page">
        <header className="cms-page-heading">
          <div>
            <p>Brands</p>
            <h1>Brands Management</h1>
            <span>Manage the group brand portfolio and brand metadata.</span>
          </div>
        </header>

        <section className="gallery-toolbar">
          <label className="gallery-search">
            Search
            <input type="search" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search brand name or category..." />
          </label>
          <div className="gallery-filters">
            <label>
              Category
              <select value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}>
                <option value="">All categories</option>
                {brandCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label>
              Status
              <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
                <option value="">All statuses</option>
                {brandStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            <label>
              Sort
              <select value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}>
                {brandSortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
          </div>
          <div className="gallery-toolbar-actions">
            <button type="button" className="primary-button" onClick={openCreate}><FiPlus /> Add Brand</button>
          </div>
        </section>

        {brandsQuery.isLoading && (
          <section className="gallery-state"><span className="loader" /><p>Loading brands...</p></section>
        )}
        {brandsQuery.isError && (
          <section className="gallery-state error-state" role="alert">
            <h2>Unable to load brands</h2>
            <p>{brandsQuery.error?.response?.data?.message || 'Please try again.'}</p>
            <button type="button" className="primary-button" onClick={() => brandsQuery.refetch()}>Try Again</button>
          </section>
        )}
        {!brandsQuery.isLoading && !brandsQuery.isError && brands.length === 0 && (
          <section className="gallery-state">
            <h2>No brands found</h2>
            <p>Add the first brand to start managing the portfolio.</p>
            <button type="button" className="primary-button" onClick={openCreate}>Add Brand</button>
          </section>
        )}
        {!brandsQuery.isLoading && !brandsQuery.isError && brands.length > 0 && (
          <div className="gallery-table-wrap">
            <table className="gallery-table brands-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Website</th>
                  <th>Status</th>
                  <th>Display Order</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={getId(brand)}>
                    <td><strong>{brand.name}</strong><small>{brand.slug}</small></td>
                    <td>{brand.category}</td>
                    <td>{brand.website || '-'}</td>
                    <td><StatusBadge status={brand.status} /></td>
                    <td>{brand.displayOrder ?? 0}</td>
                    <td>{brand.updatedAt ? new Date(brand.updatedAt).toLocaleDateString('en-IN') : '-'}</td>
                    <td>
                      <div className="gallery-actions">
                        <button type="button" onClick={() => openEdit(brand)} aria-label={`Preview ${brand.name}`}><FiEye /></button>
                        <button type="button" onClick={() => openEdit(brand)} aria-label={`Edit ${brand.name}`}><FiEdit3 /></button>
                        <button type="button" onClick={() => duplicateBrand(brand)} aria-label={`Duplicate ${brand.name}`}><FiCopy /></button>
                        <button type="button" onClick={() => setDeleteItem(brand)} aria-label={`Delete ${brand.name}`}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {drawerState.isOpen && (
        <div className="gallery-drawer-backdrop" role="presentation" onMouseDown={() => setDrawerState({ isOpen: false, mode: 'create', brand: emptyBrand })}>
          <aside className="gallery-drawer" role="dialog" aria-modal="true" aria-labelledby="brand-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
            <header className="gallery-drawer-header">
              <div>
                <p>{drawerState.mode === 'create' ? 'New Brand' : 'Edit Brand'}</p>
                <h2 id="brand-drawer-title">{drawerState.mode === 'create' ? 'Create Brand' : drawerState.brand.name}</h2>
              </div>
              <button type="button" onClick={() => setDrawerState({ isOpen: false, mode: 'create', brand: emptyBrand })} aria-label="Close brand drawer"><FiX /></button>
            </header>
            <form className="gallery-form" onSubmit={handleSubmit(saveBrand)} noValidate>
              <section className="gallery-form-section">
                <div><p>Brand Content</p><h3>Brand Details</h3></div>
                <div className="cms-grid two">
                  <label>Name<input {...register('name', { required: 'Brand name is required', maxLength: 120 })} />{errors.name && <span className="field-error">{errors.name.message}</span>}</label>
                  <label>Slug<input {...register('slug', { required: 'Slug is required', pattern: { value: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens only' } })} />{errors.slug && <span className="field-error">{errors.slug.message}</span>}</label>
                </div>
                <label>Tagline<input {...register('tagline', { maxLength: 180 })} /></label>
                <label>Short Description<textarea rows="3" {...register('shortDescription', { required: 'Short description is required', maxLength: 320 })} />{errors.shortDescription && <span className="field-error">{errors.shortDescription.message}</span>}</label>
                <label>Full Description<textarea rows="5" {...register('fullDescription')} /></label>
                <div className="cms-grid two">
                  <label>Category<select {...register('category')}>{brandCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
                  <label>Status<select {...register('status')}>{brandStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
                </div>
                <div className="cms-grid two">
                  <label>Website<input {...register('website')} /></label>
                  <label>Display Order<input type="number" min="0" {...register('displayOrder', { valueAsNumber: true })} /></label>
                </div>
              </section>
              <section className="gallery-form-section">
                <div><p>Assets</p><h3>Brand Media</h3></div>
                <div className="cms-grid two">
                  <label>Logo<input {...register('logo')} placeholder="Media URL or ID" /></label>
                  <label>Hero Image<input {...register('heroImage')} placeholder="Media URL or ID" /></label>
                </div>
                <label>Theme Color<input type="color" className="settings-color-input" {...register('themeColor')} /></label>
              </section>
              <section className="gallery-form-section">
                <div><p>SEO</p><h3>Search Metadata</h3></div>
                <label>Meta Title<input {...register('seo.metaTitle', { maxLength: 70 })} /></label>
                <label>Meta Description<textarea rows="3" {...register('seo.metaDescription', { maxLength: 160 })} /></label>
                <div className="cms-grid two">
                  <label>Keywords<input {...register('seo.keywords')} /></label>
                  <label>OG Image<input {...register('seo.ogImage')} /></label>
                </div>
              </section>
              <div className="gallery-drawer-actions">
                <button type="button" className="secondary-button" onClick={() => setDrawerState({ isOpen: false, mode: 'create', brand: emptyBrand })}>Cancel</button>
                <button type="submit" className="primary-button" disabled={createMutation.isPending || updateMutation.isPending}>{createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Brand'}</button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {deleteItem && (
        <div className="gallery-dialog-backdrop" role="presentation" onMouseDown={() => setDeleteItem(null)}>
          <section className="gallery-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-brand-title" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><p>Soft Delete</p><h2 id="delete-brand-title">Delete brand?</h2></div>
              <button type="button" onClick={() => setDeleteItem(null)} aria-label="Close delete dialog"><FiX /></button>
            </header>
            <div className="delete-warning"><p><strong>{deleteItem.name}</strong> will be removed from the active brands list.</p></div>
            <div className="gallery-drawer-actions">
              <button type="button" className="secondary-button" onClick={() => setDeleteItem(null)} disabled={deleteMutation.isPending}>Cancel</button>
              <button type="button" className="danger-button" onClick={() => deleteMutation.mutate(getId(deleteItem))} disabled={deleteMutation.isPending}>{deleteMutation.isPending ? 'Deleting...' : 'Delete Brand'}</button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default BrandsCMS
