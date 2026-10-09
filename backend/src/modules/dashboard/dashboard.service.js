import Lead from '../leads/lead.model.js'

export const getDashboardData = async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalLeads, newLeadsToday, franchiseLeads, contactLeads, careerLeads, partnershipLeads, generalLeads, recentLeads] = await Promise.all([
    Lead.count({ isDeleted: false }),
    Lead.count({ isDeleted: false, createdAt: { gte: today } }),
    Lead.count({ isDeleted: false, leadType: 'Franchise' }),
    Lead.count({ isDeleted: false, leadType: 'Contact' }),
    Lead.count({ isDeleted: false, leadType: 'Career' }),
    Lead.count({ isDeleted: false, leadType: 'Business Partnership' }),
    Lead.count({ isDeleted: false, leadType: 'General' }),
    Lead.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(5),
  ])

  return {
    stats: { totalLeads, newLeadsToday, franchiseLeads, contactLeads, careerLeads, partnershipLeads, generalLeads },
    recentLeads,
    recentActivity: [],
    systemStatus: { database: 'Connected', api: 'Online', cloudinary: 'Configured by environment', website: 'Online' },
  }
}
