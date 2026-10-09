import { FiBriefcase, FiCheckCircle, FiFileText, FiUserCheck, FiInbox, FiUsers } from 'react-icons/fi'
import StatCard from '../StatCard'

const statConfig = [
  { key: 'totalLeads', title: 'Total Leads', icon: FiInbox },
  { key: 'newLeadsToday', title: 'New Leads Today', icon: FiFileText },
  { key: 'franchiseLeads', title: 'Franchise Leads', icon: FiUsers },
  { key: 'contactLeads', title: 'Contact Leads', icon: FiCheckCircle },
  { key: 'careerLeads', title: 'Career Leads', icon: FiBriefcase },
  { key: 'partnershipLeads', title: 'Partnership Leads', icon: FiUserCheck },
  { key: 'generalLeads', title: 'General Leads', icon: FiFileText },
]

const StatsGrid = ({ stats = {} }) => {
  return (
    <section className="stats-grid" aria-label="Dashboard statistics">
      {statConfig.slice(0, 2).map((item, index) => (
        <StatCard
          key={item.key}
          icon={item.icon}
          title={item.title}
          count={stats[item.key] ?? 0}
          trend={stats.trends?.[item.key]}
          index={index}
        />
      ))}
    </section>
  )
}

export const LeadBreakdown = ({ stats = {} }) => (
  <section className="dashboard-panel lead-breakdown" aria-labelledby="breakdown-title">
    <div className="panel-heading"><div><p>Enquiry mix</p><h3 id="breakdown-title">Leads by type</h3></div></div>
    <div className="breakdown-list">
      {statConfig.slice(2).map(({ key, title, icon: Icon }) => {
        const count = stats[key] ?? 0
        const percentage = stats.totalLeads ? Math.min(100, Math.round(count / stats.totalLeads * 100)) : 0
        return <div className="breakdown-item" key={key}>
          <div className="breakdown-label"><Icon aria-hidden="true" /><span>{title.replace(' Leads', '')}</span><strong>{count.toLocaleString('en-IN')}</strong><small>{percentage}%</small></div>
          <div className="breakdown-track" aria-hidden="true"><span style={{ width: `${percentage}%` }} /></div>
        </div>
      })}
    </div>
  </section>
)

export default StatsGrid
