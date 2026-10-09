import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'
import { loaderSizes } from '../../styles/theme'

const Loader = ({ size = 'medium', className = '', label = 'Loading' }) => {
  const sizeClass = loaderSizes[size] || loaderSizes.medium

  return (
    <motion.span
      aria-label={label}
      role="status"
      className={classNames(
        'inline-flex shrink-0 rounded-full border-[var(--color-gray-200)] border-t-[var(--color-gold)]',
        sizeClass,
        className,
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default Loader
