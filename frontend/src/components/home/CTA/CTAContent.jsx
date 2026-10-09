import { motion } from 'framer-motion'
import CTAButtons from './CTAButtons'

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const CTAContent = ({ title, description, actions }) => {
  return (
    <motion.div
      className="mx-auto flex max-w-4xl flex-col items-center text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.h2
        className="text-balance text-4xl font-bold leading-tight tracking-normal text-[var(--color-gold)] sm:text-5xl lg:text-6xl"
        variants={contentVariants}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mt-6 max-w-3xl text-base leading-7 tracking-normal text-[rgba(255,255,255,0.82)] sm:text-lg"
        variants={contentVariants}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-10 w-full sm:w-auto"
        variants={contentVariants}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
      >
        <CTAButtons
          primaryLabel={actions.primary.label}
          secondaryLabel={actions.secondary.label}
        />
      </motion.div>
    </motion.div>
  )
}

export default CTAContent
