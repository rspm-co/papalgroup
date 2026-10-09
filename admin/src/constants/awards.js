export const awardCategories = [
  'Business',
  'Franchise',
  'Innovation',
  'Leadership',
  'Corporate',
  'CSR',
  'Other',
]

export const awardStatuses = ['Draft', 'Published', 'Archived']

export const awardSortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Award Date', value: 'awardDate' },
]

export const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const getAwardCover = (award = {}) => award.coverMedia || award.awardImage || award.galleryMedia?.[0] || null

export const getAwardBrandName = (brand) => {
  if (!brand) return '-'
  if (typeof brand === 'string') return brand
  return brand.name || brand.title || '-'
}
