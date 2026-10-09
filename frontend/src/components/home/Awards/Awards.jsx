import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container, Heading, Section } from '../../ui'
import AwardCard from './AwardCard'
import AwardModal from './AwardModal'
import AwardFeatureModal from './AwardFeatureModal'
import { awardsFeature } from '../../../data/awardsData'

const Awards = ({ data }) => {
  const [activeAwardId, setActiveAwardId] = useState(null)
  const [isFeatureOpen, setIsFeatureOpen] = useState(false)
  const section = data?.section
  const awards = useMemo(() => data?.items || [], [data?.items])
  const feature = data?.feature || awardsFeature

  const activeAward = useMemo(
    () => awards.find((award) => award.id === activeAwardId),
    [activeAwardId, awards],
  )

  const closeModal = useCallback(() => {
    setActiveAwardId(null)
  }, [])

  return (
    <Section
      spacing="large"
      background="default"
      className="relative overflow-hidden"
      aria-label={section?.title}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(187,155,80,0.06),transparent_34%),linear-gradient(rgba(26,26,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.02)_1px,transparent_1px)] bg-[size:auto,56px_56px,56px_56px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.62),transparent_92%)]"
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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <AwardCard
              key={award.id}
              award={award}
              index={index}
              onViewDetails={() => setActiveAwardId(award.id)}
            />
          ))}
        </div>

        {feature?.image?.src && (
          <motion.article
            className="mt-10 overflow-hidden rounded-[24px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)] lg:mt-14 lg:grid lg:grid-cols-[1.35fr_0.65fr]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="bg-[#f7f4ed] p-3 sm:p-5">
              <img src={feature.image.src} alt={feature.image.alt} className="h-auto max-h-[720px] w-full rounded-[16px] object-contain" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">{feature.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--color-black)] sm:text-3xl">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--color-gray-600)]">{feature.description}</p>
              <Button type="button" variant="secondary" size="medium" className="mt-6 w-full sm:w-fit" onClick={() => setIsFeatureOpen(true)}>
                View More
              </Button>
            </div>
          </motion.article>
        )}
      </Container>

      <AwardModal
        award={activeAward}
        isOpen={Boolean(activeAward)}
        onClose={closeModal}
      />
      <AwardFeatureModal feature={feature} isOpen={isFeatureOpen} onClose={() => setIsFeatureOpen(false)} />
    </Section>
  )
}

export default Awards
