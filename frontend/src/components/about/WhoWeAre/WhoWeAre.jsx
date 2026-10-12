import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const WhoWeAre = () => {
  return (
    <Section spacing="large" aria-label="Who We Are">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            className="lg:order-2"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Heading
              eyebrow="Who We Are"
              title="A growing ecosystem built on enterprise, trust and long-term value."
              description="R S PAPAL GROUP is a multi-brand business group committed to creating opportunities across food, services, lifestyle, digital connectivity and social impact. Every vertical is shaped with a disciplined operating mindset, customer-first thinking and a belief in sustainable growth."
              size="sm"
            />
            <p className="mt-6 text-base leading-8 text-[var(--color-gray-600)]">
              From early entrepreneurial ambition to an expanding corporate
              ecosystem, the group continues to build brands that serve people,
              empower teams and strengthen communities.
            </p>
          </motion.div>

          <motion.div
            className="relative flex min-h-[360px] flex-col gap-8 overflow-hidden rounded-[32px] border border-[var(--color-gray-200)] bg-[linear-gradient(135deg,var(--color-background),var(--color-white),#EFE6D0)] p-8 shadow-[0_18px_52px_rgba(26,26,26,0.07)] sm:min-h-[460px] lg:order-1"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="pointer-events-none absolute inset-8 rounded-[24px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,255,255,0.28)] backdrop-blur-sm" aria-hidden="true" />
            <div className="relative flex flex-1 items-center justify-center">
              <img
                src="/brands/ladachi-kulfi.png"
                alt="Ladachi Kulfi logo"
                className="h-44 w-44 object-contain sm:h-60 sm:w-60"
                width="240"
                height="240"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="relative rounded-[20px] border border-[rgba(187,155,80,0.26)] bg-[rgba(255,255,255,0.72)] p-6 backdrop-blur-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Enterprise With Purpose
              </p>
              <p className="mt-3 text-2xl font-bold text-[var(--color-black)]">
                ONE GROUP. ONE TEAM. ONE VISION.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default WhoWeAre
