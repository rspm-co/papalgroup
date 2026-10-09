import { FiDownload } from 'react-icons/fi'
import { formatLeadDate, getCsvValue, getLeadId } from '../../../constants/leads.js'

const ExportButton = ({ leads = [] }) => {
  const exportCsv = () => {
    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Lead Type', 'Preferred Brand', 'City', 'Status', 'Priority', 'Created Date']
    const rows = leads.map((lead) => [
      getLeadId(lead),
      lead.fullName,
      lead.phone,
      lead.email,
      lead.leadType,
      lead.preferredBrand,
      lead.city,
      lead.status,
      lead.priority,
      formatLeadDate(lead.createdAt),
    ])
    const csv = [headers, ...rows].map((row) => row.map(getCsvValue).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button type="button" className="secondary-button" onClick={exportCsv} disabled={!leads.length}>
      <FiDownload /> Export this page
    </button>
  )
}

export default ExportButton
