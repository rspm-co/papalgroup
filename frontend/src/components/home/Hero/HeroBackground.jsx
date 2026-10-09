import { motion } from 'framer-motion'

const HeroBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[var(--color-white)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(187,155,80,0.1),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(26,26,26,0.035),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,26,26,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.026)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.42),transparent_78%)]" />
      <motion.div
        className="absolute right-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-[var(--color-gold-soft)] blur-3xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
    </div>
  )
}

export default HeroBackground
