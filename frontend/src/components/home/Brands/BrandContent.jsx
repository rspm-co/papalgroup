import { memo } from 'react'
import { Badge, Button } from '../../ui'

const BrandContent = ({ brand, titleId }) => {
  const handleExplore = () => {
    if (brand.website && brand.website !== '#') {
      window.open(brand.website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-[var(--color-white)] text-sm font-semibold tracking-normal text-[var(--color-black)] shadow-sm">
          {brand.logo}
        </div>
        <Badge variant="secondary">{brand.category}</Badge>
      </div>

      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
        {brand.tagline}
      </p>
      <h3
        id={titleId}
        className="mt-4 text-4xl font-semibold tracking-normal text-[var(--color-black)] sm:text-5xl"
      >
        {brand.name}
      </h3>
      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-gray-600)] sm:text-lg">
        {brand.description}
      </p>

      <Button
        type="button"
        size="large"
        variant="primary"
        className="mt-8 w-full sm:w-fit"
        onClick={handleExplore}
        aria-label={`Explore ${brand.name}`}
      >
        Explore Brand
      </Button>
    </div>
  )
}

export default memo(BrandContent)
