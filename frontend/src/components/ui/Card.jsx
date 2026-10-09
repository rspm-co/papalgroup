import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'
import { cardClasses } from '../../styles/theme'

const Card = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      className={classNames(cardClasses, 'p-6 sm:p-8', className)}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
