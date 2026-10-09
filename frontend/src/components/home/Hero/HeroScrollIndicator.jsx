import { motion } from 'framer-motion'

const HeroScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[var(--color-gray-500)] sm:flex"
      aria-label="Scroll to explore"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="flex h-10 w-6 justify-center rounded-full border border-[var(--color-gray-300)] bg-[rgba(255,255,255,0.74)] p-1.5 shadow-sm backdrop-blur-xl"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
          animate={{ y: [0, 12, 0], opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <span className="text-xs font-semibold uppercase tracking-[0.16em]">
        Scroll to Explore
      </span>
    </motion.div>
  )
}

export default HeroScrollIndicator
