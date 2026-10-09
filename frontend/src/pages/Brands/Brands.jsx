import {
  BrandCTA,
  BrandsGrid,
  BrandStats,
  brandStats,
  brandsPortfolio,
} from '../../components/brands'

const Brands = () => {
  return (
    <>
      <BrandsGrid brands={brandsPortfolio} />
      <BrandStats stats={brandStats} />
      <BrandCTA />
    </>
  )
}

export default Brands
