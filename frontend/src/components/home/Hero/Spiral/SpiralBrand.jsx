import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '../../../../utils/classNames'
import BrandPreviewCard from './BrandPreviewCard'

const SpiralBrand = ({
  brand,
  config,
  isActive = false,
  isDimmed = false,
  onActivate,
  onDeactivate,
}) => {
  const handlePointerEnter = (event) => {
    if (event.pointerType !== 'touch') {
      onActivate(brand.name)
    }
  }

  return (
    <li
      className={classNames(
        'absolute -translate-x-1/2 -translate-y-1/2 will-change-transform',
        brand.positionClass,
      )}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={onDeactivate}
    >
      <motion.div
        className="relative"
        animate={{ rotate: -360 }}
        transition={{
          duration: config?.duration || 24,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className={classNames(
            'flex items-center justify-center rounded-full border border-[rgba(187,155,80,0.34)] bg-[rgba(255,255,255,0.82)] px-4 text-center shadow-[0_14px_42px_rgba(26,26,26,0.08)] backdrop-blur-xl will-change-transform',
            isActive && 'cursor-pointer',
            brand.sizeClass,
          )}
          animate={{
            opacity: isDimmed ? 0.4 : 1,
            scale: isActive ? 1.15 : 1,
            boxShadow: isActive
              ? '0 18px 52px rgba(187,155,80,0.22), 0 14px 42px rgba(26,26,26,0.1)'
              : '0 14px 42px rgba(26,26,26,0.08)',
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          <span className="text-[11px] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--color-gray-800)]">
            {brand.name}
          </span>
        </motion.div>

        <AnimatePresence>
          {isActive && <BrandPreviewCard brand={brand} />}
        </AnimatePresence>
      </motion.div>
    </li>
  )
}

export default memo(SpiralBrand)
