import { motion } from 'framer-motion'
import { Container, Section } from '../../ui'

const ChairmanMessage = () => {
  return (
    <Section spacing="large" aria-label="Chairman's Message">
      <Container>
        <motion.div
          className="grid overflow-hidden rounded-[32px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_18px_52px_rgba(26,26,26,0.07)] lg:grid-cols-[0.85fr_1.15fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <img
            src="/images/about/rahul-papal-chairman-md.jpg"
            alt="Rahul Papal, Chairman and Managing Director of R S PAPAL GROUP"
            className="h-full min-h-[360px] w-full object-cover object-center lg:order-2 lg:min-h-[560px]"
          />
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:order-1 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              Chairman&apos;s Message
            </p>
            <blockquote className="mt-8 text-2xl font-medium leading-10 text-[var(--color-black)] sm:text-3xl">
              “Our journey has always been about building businesses that create
              opportunity. We believe in trust, disciplined growth and brands
              that deliver value for people over the long term.”
            </blockquote>
            <div className="mt-10 border-l-2 border-[var(--color-gold)] pl-5">
              <p className="text-lg font-bold text-[var(--color-black)]">
                Rahul Papal
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--color-gray-600)]">
                Chairman &amp; Managing Director, R S PAPAL GROUP
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default ChairmanMessage
