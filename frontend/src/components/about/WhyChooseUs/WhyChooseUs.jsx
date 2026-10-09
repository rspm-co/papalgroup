import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const reasons = [
  {
    title: 'Experienced Team',
    description: 'A committed team with practical experience across operations and growth.',
  },
  {
    title: 'Trusted Brands',
    description: 'A portfolio built around customer trust, consistency and market relevance.',
  },
  {
    title: 'Strong Support',
    description: 'Structured guidance for partners, teams and business verticals.',
  },
  {
    title: 'Long-term Vision',
    description: 'Decisions shaped for durable growth rather than short-term movement.',
  },
]

const WhyChooseUs = () => {
  return (
    <Section spacing="large" aria-label="Why Choose Us">
      <Container>
        <Heading
          align="center"
          title="Why Choose Us"
          description="A corporate group built with discipline, support and a clear growth mindset."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.58, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  0{index + 1}
                </p>
                <h3 className="mt-6 text-2xl font-bold text-[var(--color-black)]">
                  {reason.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
                  {reason.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default WhyChooseUs
