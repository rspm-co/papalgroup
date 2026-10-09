import { motion } from 'framer-motion'
import { Button, Container, Section } from '../../ui'

const ContactCTA = () => {
  const handleClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <Section spacing="large">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-[#111111] px-6 py-20 text-center shadow-[0_18px_50px_rgba(17,17,17,0.18)] sm:px-10 lg:px-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(187,155,80,0.18)] blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Contact
            </p>
            <h2 className="mt-5 text-4xl font-extrabold tracking-normal text-[var(--color-gold)] sm:text-5xl">
              Let&apos;s Build Something Great Together
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Share your enquiry with our team and we will help you take the next step with clarity and care.
            </p>
            <Button
              type="button"
              size="large"
              className="mt-9"
              onClick={handleClick}
              aria-label="Go to contact form"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default ContactCTA
