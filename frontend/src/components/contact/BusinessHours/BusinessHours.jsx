import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const BusinessHours = ({ hours }) => {
  return (
    <Section spacing="large" aria-label="Business Hours">
      <Container>
        <Heading
          align="center"
          title="Business Hours"
          description="Our team is available during working hours for enquiries and support."
          size="sm"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
          {hours.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, duration: 0.55, ease: 'easeOut' }}
            >
              <Card className="h-full text-center">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {item.label}
                </p>
                <p className="mt-4 text-xl font-bold text-[var(--color-black)]">
                  {item.value}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default BusinessHours
