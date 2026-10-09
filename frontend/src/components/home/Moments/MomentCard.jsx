import { memo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../../ui'
import { classNames } from '../../../utils/classNames'

const MomentCard = ({ moment, onOpen }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className="mb-6 break-inside-avoid"
    >
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] text-left shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
        onClick={onOpen}
        aria-label={`Open ${moment.title}`}
      >
        <div className={classNames('relative overflow-hidden', moment.image.heightClass)}>
          {moment.image.src ? (
            <motion.img
              src={moment.image.src}
              alt={moment.image.alt}
              className="absolute inset-0 h-full w-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          ) : (
            <motion.div
              className={classNames(
                'absolute inset-0 bg-gradient-to-br',
                moment.image.gradient,
              )}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              role="img"
              aria-label={moment.image.alt}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.72)] via-[rgba(5,5,5,0.18)] to-transparent opacity-80 transition duration-300 group-hover:opacity-95" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--color-white)]">
            <Badge className="border-[var(--color-gold)] bg-[rgba(187,155,80,0.9)] text-[var(--color-white)] backdrop-blur-xl">
              {moment.category}
            </Badge>
            <motion.h3
              className="mt-4 text-2xl font-semibold tracking-normal"
              initial={false}
              animate={{ y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {moment.title}
            </motion.h3>
          </div>
        </div>
      </button>
    </motion.article>
  )
}

export default memo(MomentCard)
