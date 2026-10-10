import { memo } from 'react'
import { motion } from 'framer-motion'
import { Badge, Button } from '../../ui'

const BrandCard = ({ brand, index }) => {
  const handleVisit = () => {
    if (brand.website && brand.website !== '#') {
      window.open(brand.website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.article
      className="group h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: Math.min(index * 0.05, 0.24), duration: 0.58, ease: 'easeOut' }}
      aria-labelledby={`${brand.id}-title`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_52px_rgba(26,26,26,0.1)]">
        <div className="relative flex h-72 items-center justify-center overflow-hidden border-b border-[var(--color-gray-200)] bg-white px-10 pb-20 pt-8">
          {brand.logoImage ? (
            <img
              src={brand.logoImage}
              alt={`${brand.name} logo`}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold" style={{ color: brand.themeColor }} aria-label={brand.name}>
              {brand.logo}
            </div>
          )}
          <div className="absolute bottom-6 left-6">
            <Badge
              className="border-white/50 bg-white/90 text-[var(--color-black)] backdrop-blur-xl"
            >
              {brand.category}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={`${brand.id}-title`}
              className="text-2xl font-bold text-[var(--color-black)]"
            >
              {brand.name}
            </h2>
            <span
              className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]"
              style={{ borderColor: `${brand.themeColor}66`, color: brand.themeColor }}
            >
              {brand.status}
            </span>
          </div>
          <p
            className="mt-3 text-sm font-bold uppercase tracking-[0.16em]"
            style={{ color: brand.themeColor }}
          >
            {brand.tagline}
          </p>
          <p className="mt-4 flex-1 text-base leading-7 text-[var(--color-gray-600)]">
            {brand.description}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="medium"
            className="mt-6 w-full"
            onClick={handleVisit}
            aria-label={`Visit ${brand.name}`}
            style={{ borderColor: brand.themeColor, color: brand.themeColor }}
          >
            Visit Brand
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(BrandCard)
