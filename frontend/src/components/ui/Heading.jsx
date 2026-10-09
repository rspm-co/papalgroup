import { classNames } from '../../utils/classNames'
import { headingAlignment, headingSizes, typography } from '../../styles/theme'

const Heading = ({
  eyebrow,
  title,
  subtitle,
  description,
  size = 'md',
  align = 'left',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  titleAs: TitleTag = 'h2',
}) => {
  const selectedSize = headingSizes[size] || headingSizes.md
  const alignmentClass = headingAlignment[align] || headingAlignment.left

  return (
    <div className={classNames('flex max-w-4xl flex-col gap-3', alignmentClass, className)}>
      {eyebrow && <p className={typography.eyebrow}>{eyebrow}</p>}
      {title && (
        <TitleTag
          className={classNames(
            typography.title,
            selectedSize.title,
            titleClassName,
          )}
        >
          {title}
        </TitleTag>
      )}
      {subtitle && (
        <p
          className={classNames(
            typography.subtitle,
            selectedSize.subtitle,
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={classNames(
            typography.description,
            selectedSize.description,
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default Heading
