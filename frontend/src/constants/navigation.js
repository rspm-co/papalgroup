export const routePaths = {
  home: '/',
  about: '/about',
  brands: '/brands',
  gallery: '/gallery',
  awards: '/awards',
  careers: '/careers',
  contact: '/contact',
  franchiseEnquiry: '/franchise-enquiry',
}

export const navigationItems = [
  { label: 'Home', path: routePaths.home },
  { label: 'Brand', path: routePaths.brands },
  { label: 'Awards', path: routePaths.awards },
  { label: 'Gallery', path: routePaths.gallery },
  { label: 'Careers', path: routePaths.careers },
  { label: 'About', path: routePaths.about },
]

export const footerLinks = {
  company: [
    { label: 'About', path: routePaths.about },
    { label: 'Awards', path: routePaths.awards },
    { label: 'Careers', path: routePaths.careers },
  ],
  quickLinks: [
    { label: 'Home', path: routePaths.home },
    { label: 'Gallery', path: routePaths.gallery },
    { label: 'Contact', path: routePaths.contact },
  ],
  brands: [{ label: 'Brands', path: routePaths.brands }],
}

export const contactLinks = [
  { label: 'Contact Us', path: routePaths.contact },
]

export const socialLinks = []
