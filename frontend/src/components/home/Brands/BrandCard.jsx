import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { classNames } from '../../../utils/classNames'

const cardVariants = {
  hidden: () => ({
    opacity: 0,
    y: 24,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
}

const BrandCard = ({ brand, index }) => {
  const isWide = index % 4 === 0 || index % 4 === 3

  return (
    <motion.article
      className={classNames(
        'group relative min-h-52 overflow-hidden rounded-[18px] border border-white/10 bg-[#161616] p-5 shadow-[0_14px_42px_rgba(26,26,26,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-[0_18px_52px_rgba(26,26,26,0.22)] sm:min-h-56 sm:p-6',
        isWide && 'lg:col-span-2',
      )}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay: Math.min(index * 0.04, 0.18),
      }}
      aria-labelledby={`${brand.id}-title`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${brand.themeColor}D9 0%, ${brand.themeColor}88 34%, #161616 78%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/75">
            {brand.category}
          </p>
          {brand.logoImage ? (
            <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-white/95 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
              <img src={brand.logoImage} alt={`${brand.name} logo`} className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>
        <h3
          id={`${brand.id}-title`}
          className="mt-4 text-xl font-semibold leading-none tracking-normal text-white sm:text-2xl"
        >
          {brand.name}
        </h3>
        <p className="mt-4 max-w-md text-xs leading-5 text-white/78 sm:text-sm">
          {brand.description}
        </p>
        <Link
          to="/brands"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/55 bg-white/12 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] !text-white shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-[var(--color-gold)] hover:!text-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
          aria-label={`View ${brand.name}`}
          >
          View Brand <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
        </Link>
      </div>
    </motion.article>
  )
}

export default memo(BrandCard)
