import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Container, Heading, Section } from '../../ui'
import MomentCard from './MomentCard'
import MomentModal from './MomentModal'

const Moments = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeMomentId, setActiveMomentId] = useState(null)
  const section = data?.section
  const momentCategories = data?.categories || []
  const moments = useMemo(() => data?.items || [], [data?.items])

  const filteredMoments = useMemo(() => {
    if (activeCategory === 'All') {
      return moments
    }

    return moments.filter((moment) => moment.category === activeCategory)
  }, [activeCategory, moments])

  const activeMoment = useMemo(
    () => filteredMoments.find((moment) => moment.id === activeMomentId),
    [activeMomentId, filteredMoments],
  )

  const activeIndex = useMemo(
    () => filteredMoments.findIndex((moment) => moment.id === activeMomentId),
    [activeMomentId, filteredMoments],
  )

  const closeModal = useCallback(() => {
    setActiveMomentId(null)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveMomentId((currentId) => {
      const currentIndex = filteredMoments.findIndex(
        (moment) => moment.id === currentId,
      )
      const nextIndex =
        currentIndex <= 0 ? filteredMoments.length - 1 : currentIndex - 1

      return filteredMoments[nextIndex]?.id || null
    })
  }, [filteredMoments])

  const showNext = useCallback(() => {
    setActiveMomentId((currentId) => {
      const currentIndex = filteredMoments.findIndex(
        (moment) => moment.id === currentId,
      )
      const nextIndex =
        currentIndex >= filteredMoments.length - 1 ? 0 : currentIndex + 1

      return filteredMoments[nextIndex]?.id || null
    })
  }, [filteredMoments])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setActiveMomentId(null)
  }

  return (
    <Section
      spacing="large"
      background="default"
      className="relative overflow-hidden"
      aria-label={section?.title}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.026)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_88%)]"
        aria-hidden="true"
      />

      <Container className="relative">
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

        <div
          className="mt-10 flex flex-wrap justify-center gap-3"
          aria-label="Filter moments by category"
        >
          {momentCategories.map((category) => {
            const isActive = activeCategory === category

            return (
              <Button
                key={category}
                type="button"
                variant={isActive ? 'primary' : 'secondary'}
                size="small"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
              >
                {category}
              </Button>
            )
          })}
        </div>

        <motion.div
          layout
          className="mt-14 columns-1 gap-6 md:columns-2 xl:columns-3"
        >
          <AnimatePresence>
            {filteredMoments.map((moment) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                onOpen={() => setActiveMomentId(moment.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <MomentModal
        moment={activeMoment}
        isOpen={Boolean(activeMoment)}
        onClose={closeModal}
        onPrevious={showPrevious}
        onNext={showNext}
        activeIndex={activeIndex}
        canNavigate={filteredMoments.length > 1}
      />
    </Section>
  )
}

export default Moments
