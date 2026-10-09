import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiInbox } from 'react-icons/fi'
import LeadStatusBadge from '../../leads/LeadStatusBadge'

const RecentLeads = ({ leads = [] }) => (
  <section className="dashboard-panel recent-leads-panel" aria-labelledby="recent-leads-title">
    <div className="panel-heading"><div><p>Latest enquiries</p><h3 id="recent-leads-title">Recent leads</h3></div><Link to="/leads" className="text-link">View all <FiArrowUpRight aria-hidden="true" /></Link></div>
    {leads.length === 0 ? <div className="dashboard-empty"><FiInbox aria-hidden="true" /><h4>Your next opportunity starts here</h4><p>New website enquiries will appear here as they arrive.</p></div> :
      <div className="dashboard-table-scroll"><table className="dashboard-leads-table">
        <thead><tr><th scope="col">Contact</th><th scope="col">Status</th><th scope="col">Received</th></tr></thead>
        <tbody>{leads.slice(0, 5).map((lead) => {
          const name = lead.fullName || lead.name || 'Unnamed contact'
          return <tr key={lead.id || lead._id || lead.email}>
            <td><div className="dashboard-contact"><span className="contact-avatar" aria-hidden="true">{name.charAt(0).toUpperCase()}</span><div><strong>{name}</strong><small>{lead.leadType || lead.type || 'General'} · {lead.phone || lead.email || 'No contact details'}</small></div></div></td>
            <td><LeadStatusBadge status={lead.status} /></td>
            <td><time dateTime={lead.createdAt || undefined}>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</time></td>
          </tr>
        })}</tbody>
      </table></div>}
  </section>
)
export default RecentLeads
