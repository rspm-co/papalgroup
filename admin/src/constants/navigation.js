import { FiGrid, FiInbox, FiUser } from 'react-icons/fi'

export const appConfig = {
  name: 'R S PAPAL GROUP',
  shortName: 'RSPG',
  adminLabel: 'Lead CRM',
}

export const adminRoutes = [
  { path: '/dashboard', label: 'Dashboard', icon: FiGrid, pageTitle: 'Dashboard' },
  { path: '/leads', label: 'All Leads', icon: FiInbox, pageTitle: 'Lead Management' },
  { path: '/profile', label: 'Profile', icon: FiUser, pageTitle: 'Profile' },
]

export const modulePages = {
  brands: {
    title: 'Brands',
    description: 'Manage the group brand portfolio and brand metadata.',
  },
  gallery: {
    title: 'Gallery',
    description: 'Manage published gallery moments using the media library.',
  },
  awards: {
    title: 'Awards',
    description: 'Manage awards, certificates, recognition and SEO details.',
  },
  careers: {
    title: 'Careers',
    description: 'Manage job openings and career page content.',
  },
  leads: {
    title: 'Leads',
    description: 'Review and manage website enquiries and franchise leads.',
  },
  media: {
    title: 'Media Library',
    description: 'Upload and organize reusable CMS media assets.',
  },
  settings: {
    title: 'Website Settings',
    description: 'Manage global website configuration, SEO and contact details.',
  },
  profile: {
    title: 'Profile',
    description: 'View current admin profile and account session details.',
  },
}
