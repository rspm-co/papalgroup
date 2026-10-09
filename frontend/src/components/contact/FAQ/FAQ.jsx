import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'

const FAQ = ({ faqs }) => {
  const [activeQuestion, setActiveQuestion] = useState(faqs[0]?.question)

  return (
    <Section spacing="large">
      <Container>
        <Heading
          align="center"
          title="Frequently Asked Questions"
          description="Quick answers for franchise, career, partnership and corporate enquiries."
          size="sm"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeQuestion === faq.question

            return (
              <div
                key={faq.question}
                className="rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                  onClick={() => setActiveQuestion(isOpen ? null : faq.question)}
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-[var(--color-black)]">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-[var(--color-gold)]" aria-hidden="true">
                    {isOpen ? '-' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-base leading-7 text-[var(--color-gray-600)]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export default FAQ
