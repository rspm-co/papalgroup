import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const SocialLinks = ({ links }) => {
  const publishedLinks = links.filter(link => /^https:\/\//.test(link.url))
  if (!publishedLinks.length) return null
  return (
    <Section spacing="medium">
      <Container>
        <Heading
          align="center"
          title="Connect With Us"
          description="Follow R S PAPAL GROUP across social platforms for updates, stories and milestones."
          size="sm"
          className="mx-auto"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publishedLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.url}
              aria-label={`Visit R S PAPAL GROUP on ${link.label}`}
              className="group flex min-h-36 flex-col items-center justify-center rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] p-6 text-center shadow-[0_14px_42px_rgba(26,26,26,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_46px_rgba(187,155,80,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, duration: 0.55, ease: 'easeOut' }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold)] text-sm font-extrabold text-[var(--color-gold)] transition duration-300 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-white)]">
                {link.initials}
              </span>
              <span className="mt-4 text-base font-bold text-[var(--color-black)]">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default SocialLinks
