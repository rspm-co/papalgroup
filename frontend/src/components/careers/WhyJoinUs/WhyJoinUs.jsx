import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const WhyJoinUs = ({ features }) => {
  return (
    <Section spacing="large" aria-label="Why Join R S PAPAL GROUP">
      <Container>
        <Heading
          align="center"
          title="Why Join R S PAPAL GROUP"
          description="Work with a growing corporate group where professional discipline meets opportunity."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.58, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(187,155,80,0.28)] bg-[var(--color-gold-soft)] text-[var(--color-gold)]">
                  <span className="h-5 w-5 rounded-full border-2 border-current" />
                </div>
                <h2 className="mt-7 text-2xl font-bold text-[var(--color-black)]">
                  {feature.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default WhyJoinUs
