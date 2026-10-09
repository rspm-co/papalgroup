import { awards, awardsFeature, awardsSection } from './awardsData'
import { brands, brandsSection } from './brandsData'
import { momentCategories, moments, momentsSection } from './galleryData'
import { journeyMilestones, journeySection } from './journeyData'

export const heroData = {
  title: ['Building Businesses.', 'Creating Opportunities.'],
  subtitle:
    'Empowering brands through innovation, entrepreneurship and excellence.',
  description:
    'R S PAPAL GROUP is the parent organization behind multiple successful brands committed to delivering quality, innovation and long-term growth.',
  actions: {
    primary: {
      label: 'Explore Our Brands',
      path: '/brands',
    },
    secondary: {
      label: 'Our Journey',
      path: '/about',
    },
  },
}

export const spiralData = {
  config: {
    duration: 24,
    label: 'R S PAPAL GROUP business ecosystem',
  },
  center: {
    name: 'R S PAPAL GROUP',
  },
  brands: [
    {
      name: 'Ladachi Kulfi',
      description: 'Premium Ice Cream Brand',
      positionClass: 'left-[calc(50%+54px)] top-[calc(50%-96px)]',
      sizeClass: 'h-24 w-24',
    },
    {
      name: 'Gauraai Modak',
      description: 'हातवळणी चे उकडीचे मोदक',
      positionClass: 'left-[calc(50%+54px)] top-[calc(50%-96px)]',
      sizeClass: 'h-24 w-24',
    },
    {
      name: 'Tiparii',
      description: 'Traditional Maharashtrian Snacks',
      positionClass: 'left-[calc(50%+138px)] top-[calc(50%-18px)]',
      sizeClass: 'h-20 w-20',
    },
    {
      name: 'Brand Plus',
      description: 'Business Growth Solutions',
      positionClass: 'left-[calc(50%+104px)] top-[calc(50%+132px)]',
      sizeClass: 'h-24 w-24',
    },
    {
      name: 'Speedo Internet',
      description: 'Internet Services',
      positionClass: 'left-[calc(50%-72px)] top-[calc(50%+178px)]',
      sizeClass: 'h-28 w-28',
    },
    {
      name: 'Woodley',
      description: 'Lifestyle Brand',
      positionClass: 'left-[calc(50%-214px)] top-[calc(50%+64px)]',
      sizeClass: 'h-20 w-20',
    },
    {
      name: 'Asha',
      description: 'Community Brand',
      positionClass: 'left-[calc(50%-198px)] top-[calc(50%-122px)]',
      sizeClass: 'h-20 w-20',
    },
    {
      name: 'Bhungaa',
      description: 'Traditional Living',
      positionClass: 'left-[calc(50%-22px)] top-[calc(50%-246px)]',
      sizeClass: 'h-24 w-24',
    },
    
    {
      name: 'Mahalakshmi Services',
      description: 'Business Services',
      positionClass: 'left-[calc(50%+258px)] top-[calc(50%+112px)]',
      sizeClass: 'h-32 w-32',
    },
  ],
}

export const achievementsSection = {
  title: 'Our Impact',
  subtitle:
    'Numbers that reflect our journey of innovation, growth and excellence.',
}

export const achievements = [
  {
    id: 'years-of-excellence',
    title: 'Years of Excellence',
    value: 25,
    suffix: '+',
    icon: 'YE',
    description:
      'A decade of disciplined execution, customer trust and consistent progress.',
  },
  {
    id: 'business-brands',
    title: 'Business Brands',
    value: 9,
    suffix: '',
    icon: 'BB',
    description:
      'A growing ecosystem of businesses built across focused industries.',
  },
  {
    id: 'franchise-network',
    title: 'Franchise Network',
    value: 'Growing',
    suffix: '',
    icon: 'FN',
    description:
      'A franchise presence designed for responsible expansion and long-term partnerships.',
  },
  {
    id: 'happy-customers',
    title: 'Happy Customers',
    value: 100000,
    suffix: '+',
    icon: 'HC',
    description:
      'Customer relationships shaped through quality, service and dependable experiences.',
  },
  {
    id: 'team-members',
    title: 'Team Members',
    value: 30,
    suffix: '+',
    icon: 'TM',
    description:
      'A committed team supporting operations, brand growth and customer success.',
  },
  {
    id: 'cities-connected',
    title: 'Cities Connected',
    value: 50,
    suffix: '+',
    icon: 'CC',
    description:
      'A widening footprint connecting people, services and opportunities across regions.',
  },
]

export const homepageData = {
  hero: heroData,
  spiral: spiralData,
  journey: {
    section: journeySection,
    milestones: journeyMilestones,
  },
  brands: {
    section: brandsSection,
    items: brands,
  },
  achievements: {
    section: achievementsSection,
    items: achievements,
  },
  gallery: {
    section: momentsSection,
    categories: momentCategories,
    items: moments,
  },
  awards: {
    section: awardsSection,
    items: awards,
    feature: awardsFeature,
  },
}
