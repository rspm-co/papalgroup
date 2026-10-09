import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const BrandDetails = ({ intro, future }) => {
  return (
    <Section spacing="large" aria-label={intro.eyebrow}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <Heading
              eyebrow={intro.eyebrow}
              title={intro.title}
              description={intro.description}
              size="sm"
            />
          </motion.div>
          <motion.div
            className="rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-8 shadow-[0_14px_42px_rgba(26,26,26,0.06)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1, duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              {future.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-black)]">
              {future.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-gray-600)]">
              {future.description}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default BrandDetails
