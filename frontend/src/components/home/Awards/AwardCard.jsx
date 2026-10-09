import { memo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../ui'
import { classNames } from '../../../utils/classNames'

const cardAnimation = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const AwardCard = ({ award, index, onViewDetails }) => {
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
      className="group h-full"
      aria-labelledby={`${award.id}-title`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:border-[var(--color-gold)] group-hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)]">
        <div
          className={classNames(
            'relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br',
            award.awardImage.gradient,
          )}
          role="img"
          aria-label={award.awardImage.alt}
        >
          {award.awardImage.src ? (
            <img src={award.awardImage.src} alt={award.awardImage.alt} className="h-full w-full object-contain bg-white p-2" loading="lazy" />
          ) : (
            <>
              <div className="absolute inset-6 rounded-[20px] border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.24)] backdrop-blur-sm" />
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(187,155,80,0.35)] bg-[rgba(255,255,255,0.78)] text-3xl font-bold text-[var(--color-gold)] shadow-[0_18px_48px_rgba(26,26,26,0.1)] backdrop-blur-xl">
                {award.year}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
            {award.organization}
          </p>
          <h3
            id={`${award.id}-title`}
            className="mt-4 text-2xl font-semibold tracking-normal text-[var(--color-black)]"
          >
            {award.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-[var(--color-gray-500)]">
            {award.year}
          </p>
          <p className="mt-4 flex-1 text-base leading-7 text-[var(--color-gray-600)]">
            {award.description}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="medium"
            className="mt-6 w-full"
            onClick={onViewDetails}
            aria-label={`View details for ${award.title}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(AwardCard)
