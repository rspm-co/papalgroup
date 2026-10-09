import { useCallback, useState } from 'react'
import { classNames } from '../../../../utils/classNames'
import SpiralBrand from './SpiralBrand'
import SpiralCenter from './SpiralCenter'
import SpiralOrbit from './SpiralOrbit'

const Spiral = ({ className = '', data }) => {
  const [activeBrand, setActiveBrand] = useState(null)
  const brands = data?.brands || []
  const config = data?.config || {}

  const handleBrandActivate = useCallback((brandName) => {
    setActiveBrand(brandName)
  }, [])

  const handleBrandDeactivate = useCallback(() => {
    setActiveBrand(null)
  }, [])

  return (
    <div
      className={classNames(
        'relative h-[320px] w-[320px] overflow-visible bg-transparent sm:h-[500px] sm:w-[500px] lg:h-[650px] lg:w-[650px]',
        className,
      )}
      aria-label={config.label}
    >
      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 scale-[0.4923] sm:scale-[0.7692] lg:scale-100">
        <SpiralOrbit config={config}>
          {brands.map((brand) => (
            <SpiralBrand
              key={brand.name}
              brand={brand}
              config={config}
              isActive={activeBrand === brand.name}
              isDimmed={Boolean(activeBrand) && activeBrand !== brand.name}
              onActivate={handleBrandActivate}
              onDeactivate={handleBrandDeactivate}
            />
          ))}
        </SpiralOrbit>
        <SpiralCenter center={data?.center} />
      </div>
    </div>
  )
}

export default Spiral
