import { motion } from 'framer-motion'
import { Container, Section } from '../../ui'

const AboutHero = () => {
  return (
    <Section
      spacing="none"
      className="relative overflow-hidden bg-[var(--color-background)]"
      aria-label="About R S PAPAL GROUP"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(187,155,80,0.11),transparent_34%),linear-gradient(rgba(26,26,26,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.024)_1px,transparent_1px)] bg-[size:auto,52px_52px,52px_52px]"
        aria-hidden="true"
      />
      <Container className="relative flex min-h-[560px] items-center py-24 lg:min-h-[680px]">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            About Us
          </p>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-tight tracking-normal text-[var(--color-black)] sm:text-6xl lg:text-7xl">
            About R S PAPAL GROUP
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-2xl font-medium leading-9 text-[var(--color-black)] sm:text-3xl">
            Building Businesses.
            <span className="block">Creating Opportunities.</span>
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

export default AboutHero
