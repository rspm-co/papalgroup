import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../ui'

const cardAnimation = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const JourneyCard = ({ milestone, align = 'left' }) => {
  return (
    <motion.article
      variants={cardAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={align === 'right' ? 'lg:text-right' : 'lg:text-left'}
      tabIndex={0}
    >
      <Card
        className="group border-[var(--color-gray-200)] bg-[var(--color-white)] transition-shadow duration-300 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)] focus-within:shadow-[0_18px_52px_rgba(26,26,26,0.08)]"
        hover
      >
        {milestone.image && (
          <img
            src={milestone.image.src}
            alt={milestone.image.alt}
            className="mb-6 aspect-[16/10] w-full rounded-2xl object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
          {milestone.year}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[var(--color-black)]">
          {milestone.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">
          {milestone.description}
        </p>
      </Card>
    </motion.article>
  )
}

export default memo(JourneyCard)
