import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  AwardsDrawer,
  AwardsTable,
  AwardsToolbar,
  DeleteAwardDialog,
  EmptyState,
  LoadingState,
} from '../../components/awardsCMS'
import { createAward, deleteAward, getAwards, updateAward } from '../../services/awards.js'
import { createSlug } from '../../constants/awards.js'

const emptyAward = {
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

const getId = (item) => item?._id || item?.id || item

const getItemsFromResponse = (data) => data?.items || data?.awards || data?.docs || data?.results || []

const normalizeAward = (award = {}) => ({
  ...emptyAward,
  ...award,
  id: getId(award),
  awardDate: award.awardDate ? new Date(award.awardDate).toISOString().slice(0, 10) : '',
  brand: typeof award.brand === 'object' ? getId(award.brand) : award.brand || '',
  certificateMedia: award.certificateMedia || null,
  coverMedia: award.coverMedia || null,
  galleryMedia: award.galleryMedia || [],
  seo: {
    ...emptyAward.seo,
    ...award.seo,
    keywords: Array.isArray(award.seo?.keywords) ? award.seo.keywords.join(', ') : award.seo?.keywords || '',
  },
})

const buildPayload = (values) => ({
  title: values.title,
  slug: values.slug || createSlug(values.title),
  organization: values.organization,
  awardDate: values.awardDate,
  year: Number(values.year || new Date(values.awardDate).getFullYear()),
  description: values.description,
  brand: values.brand || undefined,
  category: values.category,
  featured: Boolean(values.featured),
  status: values.status,
  displayOrder: Number(values.displayOrder || 0),
  certificateMedia: values.certificateMedia ? getId(values.certificateMedia) : undefined,
  coverMedia: values.coverMedia ? getId(values.coverMedia) : undefined,
  galleryMedia: values.galleryMedia.map(getId).filter(Boolean),
  seo: {
    ...values.seo,
    keywords: values.seo?.keywords ? values.seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean) : [],
  },
})

const AwardsCMS = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    category: '',
    year: '',
    status: '',
    featured: '',
    sort: 'newest',
  })
  const [drawerState, setDrawerState] = useState({ isOpen: false, mode: 'create', award: emptyAward })
  const [deleteAwardItem, setDeleteAwardItem] = useState(null)

  const awardsQuery = useQuery({
    queryKey: ['awards-cms', filters],
    queryFn: () => getAwards(filters),
  })

  const awards = useMemo(() => getItemsFromResponse(awardsQuery.data), [awardsQuery.data])

  const createMutation = useMutation({
    mutationFn: createAward,
    onSuccess: () => {
      toast.success('Award created successfully')
      setDrawerState({ isOpen: false, mode: 'create', award: emptyAward })
      queryClient.invalidateQueries({ queryKey: ['awards-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to create award'),
  })

  const updateMutation = useMutation({
    mutationFn: updateAward,
    onSuccess: () => {
      toast.success('Award updated successfully')
      setDrawerState({ isOpen: false, mode: 'create', award: emptyAward })
      queryClient.invalidateQueries({ queryKey: ['awards-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update award'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAward,
    onSuccess: () => {
      toast.success('Award deleted successfully')
      setDeleteAwardItem(null)
      queryClient.invalidateQueries({ queryKey: ['awards-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete award'),
  })

  const saveAward = (values) => {
    const payload = buildPayload(values)
    const awardId = getId(drawerState.award)

    if (drawerState.mode === 'edit' && awardId) {
      updateMutation.mutate({ id: awardId, payload })
      return
    }

    createMutation.mutate(payload)
  }

  const duplicateAward = (award) => {
    const normalizedAward = normalizeAward(award)
    createMutation.mutate(buildPayload({
      ...normalizedAward,
      title: `${normalizedAward.title} Copy`,
      slug: `${normalizedAward.slug || createSlug(normalizedAward.title)}-copy-${Date.now()}`,
      status: 'Draft',
      displayOrder: Number(normalizedAward.displayOrder || 0) + 1,
    }))
  }

  const openCreateDrawer = () => setDrawerState({ isOpen: true, mode: 'create', award: emptyAward })
  const openEditDrawer = (award) => setDrawerState({ isOpen: true, mode: 'edit', award: normalizeAward(award) })
  const closeDrawer = () => setDrawerState({ isOpen: false, mode: 'create', award: emptyAward })

  return (
    <>
      <Helmet>
        <title>Awards CMS | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="gallery-cms-page awards-cms-page">
        <header className="cms-page-heading">
          <div>
            <p>Awards</p>
            <h1>Awards Management</h1>
            <span>Manage all corporate awards, recognitions and achievements.</span>
          </div>
        </header>

        <AwardsToolbar
          filters={filters}
          onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters }))}
          onCreate={openCreateDrawer}
        />

        {awardsQuery.isLoading && <LoadingState />}
        {awardsQuery.isError && (
          <section className="gallery-state error-state" role="alert">
            <h2>Unable to load awards</h2>
            <p>{awardsQuery.error?.response?.data?.message || 'Please try again.'}</p>
            <button type="button" className="primary-button" onClick={() => awardsQuery.refetch()}>
              Try Again
            </button>
          </section>
        )}
        {!awardsQuery.isLoading && !awardsQuery.isError && awards.length === 0 && <EmptyState onCreate={openCreateDrawer} />}
        {!awardsQuery.isLoading && !awardsQuery.isError && awards.length > 0 && (
          <AwardsTable
            items={awards}
            onPreview={openEditDrawer}
            onEdit={openEditDrawer}
            onDelete={setDeleteAwardItem}
            onDuplicate={duplicateAward}
          />
        )}
      </div>

      <AwardsDrawer
        isOpen={drawerState.isOpen}
        mode={drawerState.mode}
        award={drawerState.award}
        isSaving={createMutation.isPending || updateMutation.isPending}
        onClose={closeDrawer}
        onSubmit={saveAward}
      />
      <DeleteAwardDialog
        award={deleteAwardItem}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleteAwardItem(null)}
        onConfirm={(award) => deleteMutation.mutate(getId(award))}
      />
    </>
  )
}

export default AwardsCMS
