export const mediaFolders = [
  'Homepage',
  'Brands',
  'Gallery',
  'Awards',
  'Careers',
  'General',
]

export const mediaSortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'File Size', value: 'size' },
]

export const formatFileSize = (bytes = 0) => {
  if (!bytes) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

export const getMediaUrl = (media) => media?.secureUrl || media?.url || ''
