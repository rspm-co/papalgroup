import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Container, Section } from '../../ui'
import { routePaths } from '../../../constants/navigation'

const BrandCTA = () => {
  const navigate = useNavigate()

  return (
    <Section spacing="large" aria-label="Interested in Partnering With Us?">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-[#111111] px-6 py-20 text-center shadow-[0_22px_70px_rgba(26,26,26,0.16)] sm:px-10 lg:px-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(187,155,80,0.2),transparent_34%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-balance text-4xl font-bold leading-tight text-[var(--color-gold)] sm:text-5xl">
              Interested in Partnering With Us?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[rgba(255,255,255,0.82)] sm:text-lg">
              Join hands with R S PAPAL GROUP to build opportunities backed by
              trust, support and long-term thinking.
            </p>
            <Button
              type="button"
              size="large"
              className="mt-10"
              onClick={() => navigate(routePaths.contact)}
              aria-label="Become a Partner"
            >
              Become a Partner
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default BrandCTA
