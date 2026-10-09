import {
  BusinessHours,
  ContactCTA,
  ContactForm,
  ContactInfo,
  FAQ,
  MapSection,
  SocialLinks,
  businessHours,
  contactInfo,
  faqs,
  socialLinks,
} from '../../components/contact'

const Contact = () => {
  return (
    <>
      <ContactInfo info={contactInfo} />
      <ContactForm />
      <MapSection info={contactInfo} />
      <BusinessHours hours={businessHours} />
      <FAQ faqs={faqs} />
      <SocialLinks links={socialLinks} />
      <ContactCTA />
    </>
  )
}

export default Contact
