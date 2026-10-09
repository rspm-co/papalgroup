import { formatLeadDate } from '../../../constants/leads.js'

const LeadActivity = ({ lead }) => (
  <section className="lead-panel">
    <div>
      <p>Activity</p>
      <h3>Latest CRM Activity</h3>
    </div>
    <div className="lead-activity">
      <span>Lead Created</span>
      <strong>{formatLeadDate(lead.createdAt)}</strong>
      <span>Last Updated</span>
      <strong>{formatLeadDate(lead.updatedAt)}</strong>
      <span>Follow-up</span>
      <strong>{formatLeadDate(lead.followUpDate)}</strong>
    </div>
  </section>
)

export default LeadActivity
