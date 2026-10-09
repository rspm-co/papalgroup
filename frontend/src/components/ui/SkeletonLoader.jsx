import { classNames } from '../../utils/classNames'

const SkeletonLoader = ({ className = '', label = 'Loading content' }) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={classNames(
        'animate-pulse rounded-[20px] bg-[linear-gradient(90deg,var(--color-gray-100),var(--color-gray-200),var(--color-gray-100))] bg-[length:200%_100%]',
        className,
      )}
    />
  )
}

export default SkeletonLoader
