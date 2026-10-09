import { motion } from 'framer-motion'

const SpiralOrbit = ({ children, config }) => {
  return (
    <motion.ul
      className="absolute inset-0 list-none"
      aria-label="Group brands"
      animate={{ rotate: 360 }}
      transition={{
        duration: config?.duration || 24,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.ul>
  )
}

export default SpiralOrbit
