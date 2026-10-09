import { motion } from 'framer-motion'
import { Card, Container, Heading, Section } from '../../ui'

const ContactInfo = ({ info }) => {
  const items = [
    ['Corporate Office', info.corporateOffice],
    ['Address', info.address],
    ['Phone', info.phone],
    ['Email', info.email],
    ['Support Email', info.supportEmail],
    ['Website', info.website],
  ]

  return (
    <Section spacing="large" aria-label="Corporate Contact Information">
      <Container>
        <Heading
          align="center"
          title="Corporate Contact Information"
          description="Reach the right team for business enquiries, support, partnerships and general communication."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, duration: 0.55, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {label}
                </p>
                <p className="mt-4 text-xl font-bold leading-8 text-[var(--color-black)]">
                  {value}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default ContactInfo
