import { memo } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '../../../utils/classNames'

const BrandImage = ({ brand }) => {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-gray-50)] shadow-inner sm:min-h-[420px] lg:min-h-[520px]">
      <motion.div
        className={classNames(
          'absolute inset-0 bg-gradient-to-br',
          brand.image.gradient,
        )}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        role="img"
        aria-label={brand.image.alt}
      />
      <div className="absolute inset-8 rounded-[20px] border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.28)] backdrop-blur-sm" />
      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(187,155,80,0.28)] bg-[rgba(255,255,255,0.72)] text-3xl font-bold tracking-normal text-[var(--color-black)] shadow-[0_18px_48px_rgba(26,26,26,0.1)] backdrop-blur-xl">
        {brand.logo}
      </div>
      <div
        className="absolute bottom-8 left-8 h-2 w-24 rounded-full"
        style={{ backgroundColor: brand.themeColor }}
        aria-hidden="true"
      />
    </div>
  )
}

export default memo(BrandImage)
