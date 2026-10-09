import { useState } from 'react'
import { classNames } from '../../utils/classNames'
import SkeletonLoader from './SkeletonLoader'

const ImageLoader = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      {!isLoaded && <SkeletonLoader className="absolute inset-0 h-full w-full" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={classNames(
          'h-full w-full object-cover transition duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          imageClassName,
        )}
      />
    </div>
  )
}

export default ImageLoader
