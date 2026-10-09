import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const missionVision = [
  {
    title: 'Mission',
    description:
      'To build dependable businesses that deliver quality, create employment and unlock growth opportunities across industries.',
  },
  {
    title: 'Vision',
    description:
      'To become a respected corporate ecosystem known for trusted brands, responsible expansion and long-term value creation.',
  },
]

const MissionVision = () => {
  return (
    <Section spacing="large" aria-label="Mission and Vision">
      <Container>
        <Heading
          align="center"
          title="Mission & Vision"
          description="Clear direction, steady execution and a commitment to building with purpose."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {missionVision.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              <Card className="h-full p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {item.title}
                </p>
                <p className="mt-6 text-2xl font-bold leading-9 text-[var(--color-black)]">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default MissionVision
