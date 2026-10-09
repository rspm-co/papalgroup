import { motion } from 'framer-motion'
import HeroCTA from './HeroCTA'

const contentAnimation = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const HeroContent = ({ content, titleId }) => {
  const titleLines = Array.isArray(content?.title)
    ? content.title
    : [content?.title].filter(Boolean)

  return (
    <motion.div
      className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.h1
        id={titleId}
        className="text-balance text-4xl font-semibold leading-[1.08] tracking-normal text-[var(--color-black)] sm:text-5xl lg:text-6xl"
        variants={contentAnimation}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="mt-4 max-w-xl text-lg font-medium leading-7 tracking-normal text-[var(--color-black)] sm:text-xl"
        variants={contentAnimation}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {content?.subtitle}
      </motion.p>

      <motion.p
        className="mt-4 max-w-xl text-sm leading-6 tracking-normal text-[var(--color-gray-600)] sm:text-base"
        variants={contentAnimation}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {content?.description}
      </motion.p>

      <motion.div
        className="mt-6 w-full sm:w-auto"
        variants={contentAnimation}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <HeroCTA actions={content?.actions} />
      </motion.div>
    </motion.div>
  )
}

export default HeroContent
