import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi'
import { formatLeadDate, getLeadId } from '../../../constants/leads.js'
import LeadPriorityBadge from '../LeadPriorityBadge'
import LeadStatusBadge from '../LeadStatusBadge'

const LeadTable = ({ leads, onView, onEdit, onDelete }) => (
  <div className="gallery-table-wrap">
    <table className="gallery-table leads-table">
      <thead>
        <tr>
          <th>Lead ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Lead Type</th>
          <th>Preferred Brand</th>
          <th>City</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id || lead.id}>
            <td><strong>{getLeadId(lead)}</strong></td>
            <td>
              <strong>{lead.fullName}</strong>
              <small>{lead.company || 'Individual enquiry'}</small>
            </td>
            <td>{lead.phone}</td>
            <td>{lead.email}</td>
            <td>{lead.leadType}</td>
            <td>{lead.preferredBrand || '-'}</td>
            <td>{lead.city || '-'}</td>
            <td><LeadStatusBadge status={lead.status} /></td>
            <td><LeadPriorityBadge priority={lead.priority} /></td>
            <td>{formatLeadDate(lead.createdAt)}</td>
            <td>
              <div className="gallery-actions">
                <button type="button" onClick={() => onView(lead)} aria-label={`View ${lead.fullName}`}><FiEye /></button>
                <button type="button" onClick={() => onEdit(lead)} aria-label={`Edit ${lead.fullName}`}><FiEdit3 /></button>
                <button type="button" onClick={() => onDelete(lead)} aria-label={`Delete ${lead.fullName}`}><FiTrash2 /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default LeadTable
