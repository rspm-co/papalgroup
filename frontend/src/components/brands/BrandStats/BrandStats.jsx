import { memo, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, Container, Section } from '../../ui'

const StatValue = ({ value, suffix }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const numericValue = typeof value === 'number' ? value : null
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 80, damping: 22, mass: 0.7 })
  const rounded = useTransform(spring, (latest) => Math.round(latest).toLocaleString('en-IN'))

  useEffect(() => {
    if (inView && numericValue !== null) {
      count.set(numericValue)
    }
  }, [count, inView, numericValue])

  if (numericValue === null) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const BrandStats = ({ stats }) => {
  return (
    <Section spacing="medium" aria-label="Brand Statistics">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.58, ease: 'easeOut' }}
            >
              <Card className="h-full text-center">
                <p className="text-4xl font-bold text-[var(--color-black)]">
                  <StatValue value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  {stat.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default memo(BrandStats)
