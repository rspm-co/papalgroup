export const galleryCategories = [
  'Corporate',
  'Events',
  'Franchise',
  'Awards',
  'CSR',
  'Products',
  'Team',
  'Festival',
  'Media',
  'Other',
]

export const galleryStatuses = ['Draft', 'Published', 'Archived']

export const gallerySortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Display Order', value: 'displayOrder' },
]

export const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const getGalleryMediaItems = (item = {}) => {
  if (Array.isArray(item.media)) return item.media
  if (Array.isArray(item.galleryMedia)) return item.galleryMedia
  return []
}

export const getGalleryCover = (item = {}) => item.coverMedia || getGalleryMediaItems(item)[0] || null
