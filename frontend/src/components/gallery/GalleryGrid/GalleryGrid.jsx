import { AnimatePresence, motion } from 'framer-motion'
import { Container, Section } from '../../ui'
import GalleryCard from '../GalleryCard'

const GalleryGrid = ({ items, onOpen }) => {
  return (
    <Section spacing="small" aria-label="Gallery grid">
      <Container>
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          <AnimatePresence>
            {items.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => onOpen(item.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  )
}

export default GalleryGrid
