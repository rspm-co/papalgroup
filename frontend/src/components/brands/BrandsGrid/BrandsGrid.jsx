import { Container, Heading, Section } from '../../ui'
import BrandCard from '../BrandCard'

const BrandsGrid = ({ brands }) => {
  return (
    <Section spacing="large" aria-label="Brand Portfolio">
      <Container>
        <Heading
          align="center"
          title="Brand Portfolio"
          description="Every business under R S PAPAL GROUP is built with a clear purpose, distinct market role and shared commitment to excellence."
          size="sm"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default BrandsGrid
