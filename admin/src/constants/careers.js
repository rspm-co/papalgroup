export const employmentTypes = [
  'Full Time',
  'Part Time',
  'Internship',
  'Contract',
  'Freelance',
]

export const workModes = ['On Site', 'Hybrid', 'Remote']

export const jobStatuses = ['Draft', 'Published', 'Closed', 'Archived']

export const jobSortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Application Deadline', value: 'applicationDeadline' },
]

export const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const arrayToLines = (value) => (Array.isArray(value) ? value.join('\n') : value || '')

export const linesToArray = (value = '') =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
