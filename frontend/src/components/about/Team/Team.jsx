import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const teamMembers = [
  { name: 'Akshay Malik', role: 'CEO — E-commerce, Ladachi Kulfi' },
  { name: 'Mayur Palve', role: 'Tech Admin, R S PAPAL GROUP' },
  { name: 'Ankita Badade', role: 'Social Media Manager' },
  { name: 'Dinesh Jatale', role: 'Accounts' },
  { name: 'Suyash Palve', role: 'Accounts' },
  { name: 'Ajay Jadhav', role: 'Operations' },
  { name: 'Shubham Rajput', role: 'Operations' },
  { name: 'Linesh Hemane', role: 'Operations' },
  { name: 'Komal Patole', role: 'Operations' },
  { name: 'Aachal Limbhore', role: 'Reception' },
]

const initialsFor = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

const Team = () => {
  return (
    <Section spacing="large" background="muted" aria-label="The People Behind the Progress">
      <Container>
        <Heading
          align="center"
          eyebrow="Our Team"
          title="The People Behind the Progress"
          description="The team that brings care, expertise and momentum to every R S PAPAL GROUP business."
          size="sm"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              className="group rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 shadow-[0_14px_42px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.09)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.55, ease: 'easeOut' }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(187,155,80,0.3)] bg-[linear-gradient(145deg,#F7F2E5,var(--color-gold-soft))] text-lg font-bold text-[var(--color-dark-gold)] shadow-sm">
                {initialsFor(member.name)}
              </div>
              <h3 className="mt-6 text-xl font-bold text-[var(--color-black)]">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-[var(--color-gray-600)]">
                {member.role}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default Team
