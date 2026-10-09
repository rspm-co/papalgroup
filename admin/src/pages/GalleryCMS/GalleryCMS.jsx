import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  DeleteGalleryDialog,
  EmptyState,
  GalleryDrawer,
  GalleryGrid,
  GalleryTable,
  GalleryToolbar,
  LoadingState,
} from '../../components/galleryCMS'
import { createGalleryItem, deleteGalleryItem, getGalleryItems, updateGalleryItem } from '../../services/gallery.js'
import { createSlug, getGalleryMediaItems } from '../../constants/gallery.js'

const emptyGalleryItem = {
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

const getId = (item) => item?._id || item?.id

const normalizeGalleryItem = (item = {}) => ({
  ...emptyGalleryItem,
  ...item,
  id: getId(item),
  eventDate: item.eventDate ? new Date(item.eventDate).toISOString().slice(0, 10) : '',
  tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
  mediaItems: getGalleryMediaItems(item),
  seo: {
    ...emptyGalleryItem.seo,
    ...item.seo,
    keywords: Array.isArray(item.seo?.keywords) ? item.seo.keywords.join(', ') : item.seo?.keywords || '',
  },
})

const buildPayload = (values) => {
  const mediaIds = values.mediaItems.map((media) => getId(media)).filter(Boolean)

  return {
    title: values.title,
    slug: values.slug || createSlug(values.title),
    category: values.category,
    description: values.description,
    featured: Boolean(values.featured),
    status: values.status,
    displayOrder: Number(values.displayOrder || 0),
    eventDate: values.eventDate || undefined,
    location: values.location,
    tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    media: mediaIds,
    seo: {
      ...values.seo,
      keywords: values.seo?.keywords ? values.seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean) : [],
    },
  }
}

const getItemsFromResponse = (data) => data?.items || data?.gallery || data?.docs || data?.results || []

const GalleryCMS = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({ search: '', category: '', status: '', featured: '', sort: 'newest' })
  const [view, setView] = useState('table')
  const [drawerState, setDrawerState] = useState({ isOpen: false, mode: 'create', item: emptyGalleryItem })
  const [deleteItem, setDeleteItem] = useState(null)

  const galleryQuery = useQuery({
    queryKey: ['gallery-cms', filters],
    queryFn: () => getGalleryItems(filters),
  })

  const galleryItems = useMemo(() => getItemsFromResponse(galleryQuery.data), [galleryQuery.data])

  const createMutation = useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => {
      toast.success('Gallery item created successfully')
      setDrawerState({ isOpen: false, mode: 'create', item: emptyGalleryItem })
      queryClient.invalidateQueries({ queryKey: ['gallery-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to create gallery item'),
  })

  const updateMutation = useMutation({
    mutationFn: updateGalleryItem,
    onSuccess: () => {
      toast.success('Gallery item updated successfully')
      setDrawerState({ isOpen: false, mode: 'create', item: emptyGalleryItem })
      queryClient.invalidateQueries({ queryKey: ['gallery-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update gallery item'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      toast.success('Gallery item deleted successfully')
      setDeleteItem(null)
      queryClient.invalidateQueries({ queryKey: ['gallery-cms'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete gallery item'),
  })

  const saveGalleryItem = (values) => {
    const payload = buildPayload(values)
    const itemId = getId(drawerState.item)

    if (drawerState.mode === 'edit' && itemId) {
      updateMutation.mutate({ id: itemId, payload })
      return
    }

    createMutation.mutate(payload)
  }

  const duplicateGalleryItem = (item) => {
    const normalizedItem = normalizeGalleryItem(item)
    createMutation.mutate({
      ...buildPayload({
        ...normalizedItem,
        title: `${normalizedItem.title} Copy`,
        slug: `${normalizedItem.slug || createSlug(normalizedItem.title)}-copy-${Date.now()}`,
        status: 'Draft',
        displayOrder: Number(normalizedItem.displayOrder || 0) + 1,
      }),
    })
  }

  const openCreateDrawer = () => setDrawerState({ isOpen: true, mode: 'create', item: emptyGalleryItem })
  const openEditDrawer = (item) => setDrawerState({ isOpen: true, mode: 'edit', item: normalizeGalleryItem(item) })

  return (
    <>
      <Helmet>
        <title>Gallery CMS | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="gallery-cms-page">
        <header className="cms-page-heading">
          <div>
            <p>Gallery</p>
            <h1>Gallery Management</h1>
            <span>Manage all gallery events, images and albums displayed on the website.</span>
          </div>
        </header>

        <GalleryToolbar
          filters={filters}
          view={view}
          onChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters }))}
          onViewChange={setView}
          onCreate={openCreateDrawer}
        />

        {galleryQuery.isLoading && <LoadingState />}
        {galleryQuery.isError && (
          <section className="gallery-state error-state" role="alert">
            <h2>Unable to load gallery items</h2>
            <p>{galleryQuery.error?.response?.data?.message || 'Please try again.'}</p>
            <button type="button" className="primary-button" onClick={() => galleryQuery.refetch()}>
              Try Again
            </button>
          </section>
        )}
        {!galleryQuery.isLoading && !galleryQuery.isError && galleryItems.length === 0 && <EmptyState onCreate={openCreateDrawer} />}
        {!galleryQuery.isLoading && !galleryQuery.isError && galleryItems.length > 0 && (
          view === 'table' ? (
            <GalleryTable
              items={galleryItems}
              onPreview={openEditDrawer}
              onEdit={openEditDrawer}
              onDelete={setDeleteItem}
              onDuplicate={duplicateGalleryItem}
            />
          ) : (
            <GalleryGrid
              items={galleryItems}
              onPreview={openEditDrawer}
              onEdit={openEditDrawer}
              onDelete={setDeleteItem}
              onDuplicate={duplicateGalleryItem}
            />
          )
        )}
      </div>

      <GalleryDrawer
        isOpen={drawerState.isOpen}
        mode={drawerState.mode}
        item={drawerState.item}
        isSaving={createMutation.isPending || updateMutation.isPending}
        onClose={() => setDrawerState({ isOpen: false, mode: 'create', item: emptyGalleryItem })}
        onSubmit={saveGalleryItem}
      />
      <DeleteGalleryDialog
        item={deleteItem}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleteItem(null)}
        onConfirm={(item) => deleteMutation.mutate(getId(item))}
      />
    </>
  )
}

export default GalleryCMS
