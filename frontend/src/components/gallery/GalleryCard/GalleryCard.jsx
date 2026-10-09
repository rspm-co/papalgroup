import { memo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../../ui'

const GalleryCard = ({ item, index, onOpen }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 14 }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.42, ease: 'easeOut' }}
      className="h-full"
    >
      <button
        type="button"
        className="group relative flex h-full min-h-[360px] w-full overflow-hidden rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] text-left shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
        onClick={onOpen}
        aria-label={`Open ${item.title}`}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-background),var(--color-white),#EFE6D0)]"
          aria-hidden="true"
        />
        <img
          src={item.image.src}
          alt={item.image.alt}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.76)] via-[rgba(17,17,17,0.2)] to-transparent opacity-80 transition duration-300 group-hover:opacity-95" />
        <div className="relative z-10 mt-auto w-full p-6 text-[var(--color-white)]">
          <Badge className="border-[var(--color-gold)] bg-[rgba(187,155,80,0.92)] text-[var(--color-white)] shadow-[0_10px_26px_rgba(187,155,80,0.18)]">
            {item.category}
          </Badge>
          <div className="mt-4 translate-y-2 transition duration-300 group-hover:translate-y-0">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="mt-2 text-sm font-medium text-[rgba(255,255,255,0.76)]">
              {item.date}
            </p>
          </div>
        </div>
      </button>
    </motion.article>
  )
}

export default memo(GalleryCard)
