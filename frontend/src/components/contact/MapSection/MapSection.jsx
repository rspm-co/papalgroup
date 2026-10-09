import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'
import { OfficeLocations } from '../OfficeLocations'
import { FiMapPin } from 'react-icons/fi'

const MapSection = ({ info }) => {
  return (
    <Section spacing="large" aria-label="Office Location">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <motion.div
            className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-[var(--color-gray-200)] bg-[linear-gradient(135deg,var(--color-background),var(--color-white),#EFE6D0)] shadow-[0_14px_42px_rgba(26,26,26,0.06)]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="absolute inset-8 rounded-[24px] border border-[rgba(187,155,80,0.24)] bg-[rgba(255,255,255,0.42)] backdrop-blur-sm" />
            <div className="absolute inset-12 flex flex-col items-center justify-center gap-6 text-center">
              <FiMapPin size={42} className="text-[var(--color-gold)]" aria-hidden="true" />
              <p className="text-xl font-bold text-[var(--color-black)]">{info.corporateOffice}</p>
              <p className="text-sm leading-7">{info.address}</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address.replace('Regd. Office : ', ''))}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#111111] px-6 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]">Open in Google Maps</a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <Heading
              eyebrow="Office Location"
              title="Visit our corporate office."
              description="Find our address and open Google Maps to plan your visit."
              size="sm"
              className="mb-8"
            />
            <OfficeLocations info={info} />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default MapSection
