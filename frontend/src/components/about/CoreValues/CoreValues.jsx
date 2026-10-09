import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const values = [
  {
    title: 'Innovation',
    description: 'We improve continuously and build brands for evolving markets.',
  },
  {
    title: 'Trust',
    description: 'We value reliability, transparency and long-term relationships.',
  },
  {
    title: 'Quality',
    description: 'We focus on consistent standards across every business vertical.',
  },
  {
    title: 'Integrity',
    description: 'We operate with responsibility, discipline and respect.',
  },
  {
    title: 'Growth',
    description: 'We create opportunities for brands, partners, teams and customers.',
  },
  {
    title: 'Customer First',
    description: 'We build experiences around the people we serve.',
  },
]

const CoreValues = () => {
  return (
    <Section spacing="large" aria-label="Core Values">
      <Container>
        <Heading
          align="center"
          title="Core Values"
          description="The principles that guide how we build, operate and grow."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, duration: 0.58, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(187,155,80,0.28)] bg-[var(--color-gold-soft)] text-[var(--color-gold)]">
                  <span className="h-5 w-5 rounded-full border-2 border-current" />
                </div>
                <h3 className="mt-7 text-2xl font-bold text-[var(--color-black)]">
                  {value.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default CoreValues
