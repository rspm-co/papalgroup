import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const Benefits = ({ benefits }) => {
  return (
    <Section spacing="large" aria-label="Employee Benefits">
      <Container>
        <Heading
          align="center"
          title="Employee Benefits"
          description="A workplace built to support learning, recognition and meaningful contribution."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              className="rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.04, duration: 0.5, ease: 'easeOut' }}
            >
              <p className="text-lg font-bold text-[var(--color-black)]">
                {benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default Benefits
