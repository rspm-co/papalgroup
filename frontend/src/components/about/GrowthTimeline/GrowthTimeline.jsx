import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const milestones = [
  {
    year: '2017',
    title: 'Speedo Internet launched',
    description: 'First step into entrepreneurship.',
  },
  {
    year: '2017–18',
    title: 'Ladachi Kulfi born',
    description: 'Manufacturing begins.',
  },
  {
    year: '2018',
    title: 'First outlet — 7 April',
    description: 'Retail expansion begins.',
  },
  {
    year: '2018–20',
    title: '150+ branches',
    description: 'Rapid growth.',
  },
  {
    year: '2020',
    title: 'R. S. Papal Marketing Pvt. Ltd. established',
    description: 'Multiple brands brought under one group.',
  },
  {
    year: '2020',
    title: 'COVID resilience',
    description: 'Distribution and branding strengthened.',
  },
  {
    year: '2020 onward',
    title: 'Multi-brand expansion',
    description: 'Brand+ · Step Up Coffee · Ora Cake · Mahalaxmi Foods · Speedo Internet.',
  },
  {
    year: 'Today',
    title: '~400 Ladachi Kulfi outlets',
    description: 'Manufacturing expansion, new entrepreneurs, employment and a larger national vision.',
  },
]

const GrowthTimeline = () => {
  return (
    <Section spacing="large" aria-label="Growth Timeline">
      <Container>
        <Heading
          align="center"
          title="Growth Timeline"
          description="From our first entrepreneurial step to a growing national business ecosystem."
          size="sm"
          className="mx-auto"
        />
        <div className="relative mt-16">
          <div
            className="absolute bottom-0 left-5 top-0 w-px bg-[var(--color-gray-200)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="h-full origin-top bg-[var(--color-gold)]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <ol className="relative flex flex-col gap-10 md:gap-14">
            {milestones.map((milestone, index) => {
              const isRight = index % 2 !== 0

              return (
                <li
                  key={`${milestone.year}-${milestone.title}`}
                  className="relative grid gap-6 pl-14 md:grid-cols-[1fr_64px_1fr] md:items-center md:gap-6 md:pl-0"
                >
                  <div className="hidden md:block">
                    {!isRight && (
                      <TimelineCard milestone={milestone} align="right" index={index} />
                    )}
                  </div>
                  <motion.div
                    className="absolute left-5 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-white)] bg-[var(--color-gold)] shadow-[0_0_0_1px_rgba(187,155,80,0.35),0_10px_28px_rgba(187,155,80,0.16)] md:static md:mx-auto md:translate-x-0"
                    initial={{ opacity: 0, scale: 0.75 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.06, type: 'spring', stiffness: 220, damping: 20 }}
                    aria-hidden="true"
                  />
                  <div className="hidden md:block">
                    {isRight && <TimelineCard milestone={milestone} index={index} />}
                  </div>
                  <div className="md:hidden">
                    <TimelineCard milestone={milestone} index={index} />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

const TimelineCard = ({ milestone, align = 'left', index }) => (
  <motion.article
    className={align === 'right' ? 'lg:text-right' : 'lg:text-left'}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ delay: index * 0.05, duration: 0.58, ease: 'easeOut' }}
  >
    <div className="rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)]">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
        {milestone.year}
      </p>
      <h3 className="mt-3 text-2xl font-bold text-[var(--color-black)]">
        {milestone.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
        {milestone.description}
      </p>
    </div>
  </motion.article>
)

export default GrowthTimeline
