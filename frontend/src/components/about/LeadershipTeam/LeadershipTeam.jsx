import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const leaders = [
  {
    name: 'Aasha Papal',
    role: 'Director, R S PAPAL GROUP',
    image: '/images/about/directors/aasha-papal.jpg',
    message: 'Guiding our people and purpose with care, clarity and conviction.',
  },
  {
    name: 'Akshada R Papal',
    role: 'Director, R S PAPAL GROUP',
    image: '/images/about/directors/akshada-papal.png',
    message: 'Building thoughtful systems and experiences that move our brands forward.',
  },
]

const LeadershipTeam = () => (
  <Section spacing="large" background="muted" aria-label="Directors">
    <Container>
      <Heading
        align="center"
        eyebrow="Leadership"
        title="The people behind our progress"
        description="Meet the directors helping shape the next chapter of R S PAPAL GROUP."
        size="sm"
        className="mx-auto"
      />
      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {leaders.map((leader, index) => (
          <motion.article
            key={leader.name}
            className="group overflow-hidden rounded-[24px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.1)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-[var(--color-gray-100)]">
              <img src={leader.image} alt={`${leader.name}, ${leader.role}`} className="h-full w-full bg-[#f7f4ed] object-contain object-center transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="text-2xl font-bold text-[var(--color-black)]">{leader.name}</h3>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-gold)]">{leader.role}</p>
              <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">“{leader.message}”</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Container>
  </Section>
)

export default LeadershipTeam
