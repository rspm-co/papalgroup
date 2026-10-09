import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'
import AchievementCard from './AchievementCard'

const Achievements = ({ data }) => {
  const section = data?.section
  const achievements = data?.items || []

  return (
    <Section
      spacing="large"
      background="default"
      className="relative overflow-hidden"
      aria-label={section?.title}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(187,155,80,0.06),transparent_32%),linear-gradient(rgba(26,26,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.02)_1px,transparent_1px)] bg-[size:auto,52px_52px,52px_52px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.62),transparent_92%)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading
            align="center"
            title={section?.title}
            subtitle={section?.subtitle}
            size="md"
            titleAs="h2"
            className="mx-auto"
          />
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default Achievements
