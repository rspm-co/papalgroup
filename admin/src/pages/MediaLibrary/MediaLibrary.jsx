import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  DeleteMediaDialog,
  EmptyState,
  LoadingState,
  MediaDetailsDrawer,
  MediaFolderTree,
  MediaGrid,
  MediaPreviewModal,
  MediaTable,
  MediaToolbar,
  MediaUploader,
} from '../../components/media'
import { deleteMedia, getMediaLibrary, updateMedia, uploadMedia, uploadMultipleMedia } from '../../services/media.js'

const getId = (media) => media?._id || media?.id
const getItemsFromResponse = (data) => data?.items || data?.media || data?.docs || data?.results || []

const MediaLibrary = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({ search: '', folder: '', tags: '', sort: 'newest' })
  const [view, setView] = useState('grid')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const [previewMedia, setPreviewMedia] = useState(null)
  const [editMedia, setEditMedia] = useState(null)
  const [deleteMediaItem, setDeleteMediaItem] = useState(null)

  const mediaQuery = useQuery({
    queryKey: ['media-library', filters],
    queryFn: () => getMediaLibrary(filters),
  })

  const mediaItems = useMemo(() => getItemsFromResponse(mediaQuery.data), [mediaQuery.data])

  const uploadMutation = useMutation({
    mutationFn: ({ files, metadata }) => {
      setUploadProgress(0)
      if (files.length > 1) {
        return uploadMultipleMedia({ files, metadata, onProgress: setUploadProgress })
      }
      return uploadMedia({ file: files[0], metadata, onProgress: setUploadProgress })
    },
    onSuccess: () => {
      toast.success('Media uploaded successfully')
      setIsUploaderOpen(false)
      setUploadProgress(0)
      queryClient.invalidateQueries({ queryKey: ['media-library'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to upload media'),
  })

  const updateMutation = useMutation({
    mutationFn: updateMedia,
    onSuccess: () => {
      toast.success('Media updated successfully')
      setEditMedia(null)
      queryClient.invalidateQueries({ queryKey: ['media-library'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to update media'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      toast.success('Media deleted successfully')
      setDeleteMediaItem(null)
      queryClient.invalidateQueries({ queryKey: ['media-library'] })
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Unable to delete media'),
  })

  const copyValue = async (value) => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard')
  }

  const saveMedia = (values) => {
    updateMutation.mutate({
      id: getId(editMedia),
      payload: {
        ...values,
        tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      },
    })
  }

  return (
    <>
      <Helmet>
        <title>Media Library | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="media-library-page">
        <header className="cms-page-heading">
          <div>
            <p>Media</p>
            <h1>Media Library</h1>
            <span>Manage all images and media assets used across the website.</span>
          </div>
        </header>

        <MediaToolbar
          filters={filters}
          view={view}
          onFilterChange={(nextFilters) => setFilters((current) => ({ ...current, ...nextFilters }))}
          onViewChange={setView}
          onUpload={() => setIsUploaderOpen(true)}
        />

        <div className="media-library-shell">
          <MediaFolderTree activeFolder={filters.folder} onSelect={(folder) => setFilters((current) => ({ ...current, folder }))} />
          <main>
            {mediaQuery.isLoading && <LoadingState label="Loading media assets..." />}
            {mediaQuery.isError && (
              <section className="gallery-state error-state" role="alert">
                <h2>Unable to load media</h2>
                <p>{mediaQuery.error?.response?.data?.message || 'Please try again.'}</p>
                <button type="button" className="primary-button" onClick={() => mediaQuery.refetch()}>
                  Try Again
                </button>
              </section>
            )}
            {!mediaQuery.isLoading && !mediaQuery.isError && mediaItems.length === 0 && <EmptyState onUpload={() => setIsUploaderOpen(true)} />}
            {!mediaQuery.isLoading && !mediaQuery.isError && mediaItems.length > 0 && (
              view === 'grid' ? (
                <MediaGrid items={mediaItems} onPreview={setPreviewMedia} onEdit={setEditMedia} onDelete={setDeleteMediaItem} onCopy={copyValue} />
              ) : (
                <MediaTable items={mediaItems} onPreview={setPreviewMedia} onEdit={setEditMedia} onDelete={setDeleteMediaItem} onCopy={copyValue} />
              )
            )}
          </main>
        </div>
      </div>

      <MediaUploader
        isOpen={isUploaderOpen}
        isUploading={uploadMutation.isPending}
        progress={uploadProgress}
        onClose={() => setIsUploaderOpen(false)}
        onUpload={(files, metadata) => uploadMutation.mutate({ files, metadata })}
      />
      <MediaPreviewModal media={previewMedia} onClose={() => setPreviewMedia(null)} onCopy={copyValue} />
      <MediaDetailsDrawer media={editMedia} isSaving={updateMutation.isPending} onClose={() => setEditMedia(null)} onCopy={copyValue} onSave={saveMedia} />
      <DeleteMediaDialog
        media={deleteMediaItem}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setDeleteMediaItem(null)}
        onConfirm={(media) => deleteMutation.mutate(getId(media))}
      />
    </>
  )
}

export default MediaLibrary
