import { motion } from 'framer-motion'
import { Container, Heading, Section } from '../../ui'
import BrandCard from './BrandCard'

const Brands = ({ data }) => {
  const section = data?.section
  const brands = data?.items || []

  return (
    <Section
      spacing="large"
      background="default"
      className="relative overflow-hidden"
      aria-label={section?.title}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading
            align="center"
            title={section?.title}
            subtitle={section?.subtitle}
            size="md"
            titleAs="h2"
            className="mx-auto"
          />
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default Brands
