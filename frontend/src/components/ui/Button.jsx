import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'
import {
  buttonBaseClasses,
  buttonSizes,
  buttonVariants,
} from '../../styles/theme'
import Loader from './Loader'

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  type = 'button',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props
}) => {
  const variantClass = buttonVariants[variant] || buttonVariants.primary
  const sizeClass = buttonSizes[size] || buttonSizes.medium
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      className={classNames(
        buttonBaseClasses,
        variantClass,
        sizeClass,
        fullWidth && 'w-full',
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      {loading && <Loader size="small" label="Button loading" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </motion.button>
  )
}

export default Button
