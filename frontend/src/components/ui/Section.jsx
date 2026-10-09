import { classNames } from '../../utils/classNames'
import { sectionBackgrounds, sectionSpacing } from '../../styles/theme'

const Section = ({
  children,
  className = '',
  background = 'default',
  spacing = 'medium',
  as: Component = 'section',
  ...props
}) => {
  const backgroundClass =
    sectionBackgrounds[background] || sectionBackgrounds.default
  const spacingClass = sectionSpacing[spacing] || sectionSpacing.medium

  return (
    <Component
      className={classNames(backgroundClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Section
