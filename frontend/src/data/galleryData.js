export const momentsSection = {
  title: 'Moments That Built Us',
  subtitle: 'Every milestone tells a story of passion, growth and excellence.',
}

export const galleryHero = {
  title: 'Gallery',
  subtitle: 'Explore the moments that define the journey of R S PAPAL GROUP.',
}

export const galleryCategories = [
  'All',
  'Corporate',
  'Events',
  'Awards',
  'CSR',
  'Franchise',
  'Team',
  'Products',
  'Media',
  'Festival',
]

export const galleryItems = [
  {
    id: 'cart-opening-ceremony',
    title: 'Cart Opening Ceremony',
    description: 'The Tiparii team and guests at the cart opening ceremony.',
    category: 'Events',
    image: {
      src: '/images/gallery/cart-opening-ceremony.png',
      alt: 'Tiparii team and guests gathered for the cart opening ceremony',
    },
  },
  {
    id: 'corporate-leadership-meet',
    title: 'Papal Family Moment',
    description:
      'A family portrait shared as part of the Papal Group journey.',
    category: 'Corporate',
    image: {
      src: '/images/gallery/family-moment.jpeg',
      alt: 'Family moment with R S PAPAL GROUP leadership',
    },
    date: 'August 2026',
  },
  {
    id: 'franchise-partner-meeting',
    title: 'Delivery Vehicle Launch',
    description:
      'Celebrating a refrigerated delivery vehicle with a garlanded vehicle and guests.',
    category: 'Events',
    image: {
      src: '/images/gallery/delivery-launch.jpeg',
      alt: 'Franchise delivery vehicle launch',
    },
    date: 'August 2026',
  },
  {
    id: 'csr-community-initiative',
    title: 'Raireshwar Temple Adoption',
    description:
      'Papal Group’s Ladachi Kulfi adopted Raireshwar Temple as part of its community initiative.',
    category: 'CSR',
    image: {
      src: '/images/gallery/raireshwar-temple-csr.png',
      alt: 'Ladachi Kulfi Raireshwar Temple adoption community initiative',
    },
    date: 'August 2026',
  },
  {
    id: 'team-growth-day',
    title: 'Annual Team Gathering',
    description:
      'A group portrait of the team and guests at a gathering.',
    category: 'Team',
    image: {
      src: '/images/gallery/annual-gathering.jpeg',
      alt: 'Annual gathering with the R S PAPAL GROUP team',
    },
    date: 'August 2026',
  },
  {
    id: 'product-launch-showcase',
    title: 'Leadership and Team Portrait',
    description:
      'A formal group portrait of the Papal Group team.',
    category: 'Team',
    image: {
      src: '/images/gallery/leadership-team.jpeg',
      alt: 'Leadership and team portrait',
    },
    date: 'August 2026',
  },
  {
    id: 'media-coverage-feature',
    title: 'Ladachi Kulfi Media Coverage',
    description:
      'Marathi television coverage featuring Ladachi Kulfi.',
    category: 'Media',
    image: {
      src: '/images/gallery/media-coverage-feature.png',
      alt: 'Marathi television media coverage featuring Ladachi Kulfi',
    },
    date: 'August 2026',
  },
  {
    id: 'food-festival-presence',
    title: 'Recognition and Felicitation',
    description:
      'A presentation and felicitation moment with guests on stage.',
    category: 'Awards',
    image: {
      src: '/images/gallery/recognition-event.jpeg',
      alt: 'Recognition event with business partners',
    },
    date: 'August 2026',
  },
  {
    id: 'corporate-planning-session',
    title: 'Annual Get-Together Celebration',
    description:
      'A cake-cutting celebration at the annual get-together.',
    category: 'Events',
    image: {
      src: '/images/gallery/annual-get-together.jpeg',
      alt: 'Annual get-together and celebration',
    },
    date: 'August 2026',
  },
  {
    id: 'franchise-support-workshop',
    title: 'Ladachi Kulfi Guest Moment',
    description:
      'A guest enjoying Ladachi Kulfi at Hotel Majestique.',
    category: 'Events',
    image: {
      src: '/images/gallery/ladachi-partner.jpeg',
      alt: 'Guest holding a kulfi beside a representative at Hotel Majestique',
    },
    date: 'August 2026',
  },
]

// Homepage cards add presentation sizing to the shared gallery content.
export const momentCategories = galleryCategories
const momentHeights = ['h-[420px]', 'h-[520px]', 'h-[360px]', 'h-[460px]']
export const moments = galleryItems.map((item, index) => ({
  ...item,
  image: { ...item.image, heightClass: momentHeights[index % momentHeights.length] },
}))
