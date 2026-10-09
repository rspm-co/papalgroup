export const brandCategories = ['Food', 'Technology', 'Retail', 'Services', 'Foundation', 'Other']

export const brandStatuses = ['Active', 'Inactive', 'Draft']

export const brandSortOptions = [
  { label: 'Display Order', value: 'displayOrder' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

export const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
