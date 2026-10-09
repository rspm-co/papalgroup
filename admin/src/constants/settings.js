export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const defaultBusinessHours = weekDays.reduce(
  (hours, day) => ({ ...hours, [day.toLowerCase()]: '' }),
  {},
)

export const defaultSettingsValues = {
  id: '',
  companyName: '',
  tagline: '',
  website: '',
  logo: '',
  favicon: '',
  primaryBrandColor: '#BB9B50',
  secondaryBrandColor: '#111111',
  primaryEmail: '',
  supportEmail: '',
  phone: '',
  whatsapp: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  googleMapsEmbed: '',
  businessHours: defaultBusinessHours,
  socialLinks: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: '',
  },
  seo: {
    defaultTitle: '',
    defaultDescription: '',
    defaultKeywords: '',
    defaultOgImage: '',
  },
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    metaPixelId: '',
  },
  maintenanceMode: false,
  maintenanceMessage: '',
}

export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Enter a valid email address',
}

export const phonePattern = {
  value: /^[0-9+\-\s()]{7,20}$/,
  message: 'Enter a valid phone number',
}

export const urlPattern = {
  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/,
  message: 'Enter a valid URL',
}
