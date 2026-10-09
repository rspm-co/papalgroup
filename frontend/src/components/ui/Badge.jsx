import { classNames } from '../../utils/classNames'
import { badgeBaseClasses, badgeVariants } from '../../styles/theme'

const Badge = ({
  children,
  className = '',
  variant = 'primary',
  as: Component = 'span',
}) => {
  const variantClass = badgeVariants[variant] || badgeVariants.primary

  return (
    <Component className={classNames(badgeBaseClasses, variantClass, className)}>
      {children}
    </Component>
  )
}

export default Badge
