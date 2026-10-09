import { memo, useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Card } from '../../ui'

const cardAnimation = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const AchievementValue = ({ value, suffix }) => {
  const valueRef = useRef(null)
  const isInView = useInView(valueRef, { once: true, amount: 0.5 })
  const numericValue = typeof value === 'number' ? value : null
  const count = useMotionValue(0)
  const springCount = useSpring(count, {
    stiffness: 80,
    damping: 22,
    mass: 0.7,
  })
  const rounded = useTransform(springCount, (latest) =>
    Math.round(latest).toLocaleString('en-IN'),
  )

  useEffect(() => {
    if (isInView && numericValue !== null) {
      count.set(numericValue)
    }
  }, [count, isInView, numericValue])

  if (numericValue === null) {
    return (
      <motion.span
        ref={valueRef}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {value}
      </motion.span>
    )
  }

  return (
    <span ref={valueRef}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.article
      variants={cardAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.58,
        ease: 'easeOut',
        delay: Math.min(index * 0.06, 0.24),
      }}
      tabIndex={0}
      aria-labelledby={`${achievement.id}-title`}
    >
      <Card className="group h-full border-[var(--color-gray-200)] bg-[var(--color-white)] transition duration-300 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)] focus-within:shadow-[0_18px_52px_rgba(26,26,26,0.08)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[rgba(187,155,80,0.28)] bg-[var(--color-gold-soft)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-gold)] shadow-sm transition duration-300 group-hover:scale-105">
          {achievement.icon}
        </div>

        <p className="mt-8 text-5xl font-semibold tracking-normal text-[var(--color-black)]">
          <AchievementValue
            value={achievement.value}
            suffix={achievement.suffix}
          />
        </p>

        <h3
          id={`${achievement.id}-title`}
          className="mt-4 text-xl font-semibold tracking-normal text-[var(--color-black)]"
        >
          {achievement.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
          {achievement.description}
        </p>
      </Card>
    </motion.article>
  )
}

export default memo(AchievementCard)
