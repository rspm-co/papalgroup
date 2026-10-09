import { motion } from 'framer-motion'
import { Button, Container, Section } from '../../ui'

const GalleryPagination = ({ visibleCount, totalCount, onLoadMore }) => {
  const hasMore = visibleCount < totalCount

  return (
    <Section spacing="small" aria-label="Gallery pagination">
      <Container className="flex justify-center">
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={onLoadMore}
              aria-label="Load more gallery items"
            >
              Load More
            </Button>
          </motion.div>
        )}
      </Container>
    </Section>
  )
}

export default GalleryPagination
