import { motion } from 'framer-motion'
import { Button, Container, Section } from '../../ui'

const GalleryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <Section spacing="small" aria-label="Gallery category filters">
      <Container>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category

            return (
              <Button
                key={category}
                type="button"
                size="small"
                variant={isActive ? 'primary' : 'secondary'}
                onClick={() => onCategoryChange(category)}
                aria-pressed={isActive}
              >
                {category}
              </Button>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}

export default GalleryFilter
