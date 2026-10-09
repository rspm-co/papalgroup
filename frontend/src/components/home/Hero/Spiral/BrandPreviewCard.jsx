import { memo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../ui'

const BrandPreviewCard = ({ brand }) => {
  return (
    <motion.aside
      className="pointer-events-auto absolute left-[calc(100%+14px)] top-1/2 z-30 w-56 -translate-y-1/2 rounded-[20px] border border-[rgba(187,155,80,0.22)] bg-[rgba(255,255,255,0.9)] p-4 text-left shadow-[0_18px_52px_rgba(26,26,26,0.1)] backdrop-blur-2xl"
      initial={{ opacity: 0, scale: 0.92, x: -8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.94, x: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      aria-label={`${brand.name} preview`}
    >
      <h3 className="text-sm font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--color-black)]">
        {brand.name}
      </h3>
      <p className="mt-2 text-sm leading-5 text-[var(--color-gray-600)]">
        {brand.description}
      </p>
      <Button
        type="button"
        variant="ghost"
        size="small"
        className="mt-4 px-0 text-[var(--color-black)] hover:bg-transparent"
        aria-label={`Explore ${brand.name}`}
      >
        Explore →
      </Button>
    </motion.aside>
  )
}

export default memo(BrandPreviewCard)
