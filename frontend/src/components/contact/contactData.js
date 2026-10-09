export const contactHero = {
  title: "Let's Connect",
  subtitle:
    "We'd love to hear from you. Whether it's a business enquiry, franchise opportunity or general question, our team is here to help.",
}

export const contactInfo = {
  corporateOffice: 'R S PAPAL GROUP Head Office',
  address: 'Regd. Office : 101, Lake Breeze S. NO 50/3,Varkhade Nagar, Katraj,Pune 411046.',
  phone: '+91 99232 12535',
  email: 'info@papalgroup.com',
  supportEmail: 'admin@papalgroup.com',
  website: import.meta.env.VITE_SITE_URL ? new URL(import.meta.env.VITE_SITE_URL).host : window.location.host,
}

export const businessHours = [
  { label: 'Monday - Saturday', value: '10:00 AM - 7:00 PM' },
  { label: 'Sunday', value: 'Closed' },
]

export const faqs = [
  {
    question: 'How can I apply for a franchise?',
    answer:
      'You can submit a business enquiry through the contact form. Our team will review your details and connect with you for the next steps.',
  },
  {
    question: 'How do I contact corporate support?',
    answer:
      'You can reach corporate support through the support email or phone number listed on this page.',
  },
  {
    question: 'How do I apply for a job?',
    answer:
      'Visit the Careers page to view open positions and apply, or email your resume to digital@papalgroup.com.',
  },
  {
    question: 'How can I partner with R S PAPAL GROUP?',
    answer:
      'Share your partnership enquiry through the form with relevant details, and the business team will respond.',
  },
]

export const socialLinks = []
