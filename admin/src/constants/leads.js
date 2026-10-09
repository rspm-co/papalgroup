export const leadTypes = ['Contact', 'Franchise', 'Career', 'Business Partnership', 'General']

export const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost', 'Closed']

export const leadPriorities = ['Low', 'Medium', 'High', 'Urgent']

export const leadSortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

export const leadTimelineStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost']

export const getLeadId = (lead = {}) => lead.leadId || lead._id || lead.id || '-'

export const formatLeadDate = (value) => (value ? new Date(value).toLocaleDateString('en-IN') : '-')

export const getCsvValue = (value) => {
  const text = String(value ?? '')
  const safeText = /^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text) ? `'${text}` : text
  return `"${safeText.replace(/"/g, '""')}"`
}
