import { motion } from 'framer-motion'
import { Container, Section } from '../../ui'

const ContactHero = ({ hero }) => {
  return (
    <Section spacing="none" className="relative overflow-hidden" aria-label={hero.title}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(187,155,80,0.1),transparent_34%),linear-gradient(rgba(26,26,26,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.024)_1px,transparent_1px)] bg-[size:auto,52px_52px,52px_52px]"
        aria-hidden="true"
      />
      <Container className="relative flex min-h-[520px] items-center py-24 lg:min-h-[640px]">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Contact
          </p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-tight text-[var(--color-black)] sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-xl font-medium leading-8 text-[var(--color-gray-600)] sm:text-2xl">
            {hero.subtitle}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

export default ContactHero
