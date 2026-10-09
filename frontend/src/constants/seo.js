const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')

export const seoDefaults = {
  canonicalBaseUrl: siteUrl,
  ogImage: import.meta.env.VITE_OG_IMAGE_URL || '',
}

export const pageSeo = {
  '/': {
    title: 'R S PAPAL GROUP',
    description:
      'Official corporate website of R S PAPAL GROUP, building businesses and creating opportunities across multiple industries.',
  },
  '/about': {
    title: 'About R S PAPAL GROUP',
    description:
      'Learn about the journey, vision, values and growth of R S PAPAL GROUP.',
  },
  '/brands': {
    title: 'Our Brands',
    description:
      'Explore the diverse business portfolio built by R S PAPAL GROUP across industries.',
  },
  '/gallery': {
    title: 'Gallery',
    description:
      'Explore corporate events, brand launches, awards, CSR activities and milestones from R S PAPAL GROUP.',
  },
  '/awards': {
    title: 'Awards and Recognition',
    description:
      'Recognition and achievements earned by R S PAPAL GROUP through innovation, entrepreneurship and excellence.',
  },
  '/careers': {
    title: 'Careers',
    description:
      'Build your career with R S PAPAL GROUP and join a team focused on growth, culture and opportunity.',
  },
  '/contact': {
    title: 'Contact R S PAPAL GROUP',
    description:
      'Contact R S PAPAL GROUP for business enquiries, franchise opportunities, partnerships and corporate support.',
  },
  '/franchise-enquiry': {
    title: 'Franchise Enquiry',
    description:
      'Explore franchise opportunities with R S PAPAL GROUP and register your interest in one of our brands.',
  },
  '*': {
    title: 'Page Not Found',
    description: 'The requested page could not be found on R S PAPAL GROUP.',
  },
}
