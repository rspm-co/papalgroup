import { motion } from 'framer-motion'
import { Container, Section } from '../../ui'
import CTAContent from './CTAContent'

const ctaContent = {
  title: 'Ready to Build the Next Success Story?',
  description:
    "Whether you're looking to start a business, partner with us or explore our brands, R S PAPAL GROUP is committed to building opportunities that create long-term value.",
  actions: {
    primary: {
      label: 'Become a Franchise Partner',
    },
    secondary: {
      label: 'Explore Our Brands',
    },
  },
}

const CTA = ({ content = ctaContent }) => {
  return (
    <Section
      spacing="large"
      background="default"
      className="overflow-hidden"
      aria-label={content.title}
    >
      <Container>
        <motion.div
          className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[32px] bg-[#111111] px-6 py-20 shadow-[0_22px_70px_rgba(26,26,26,0.16)] sm:px-10 lg:px-16"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(187,155,80,0.2),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(255,255,255,0.06),transparent_28%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(187,155,80,0.16)] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <CTAContent
              title={content.title}
              description={content.description}
              actions={content.actions}
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default CTA
