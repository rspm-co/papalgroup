import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import JourneyCard from './JourneyCard'

const itemAnimation = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1 },
}

const JourneyTimeline = ({ milestones }) => {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 35%'],
  })
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  return (
    <div ref={timelineRef} className="relative mt-16 lg:mt-20">
      <div
        className="absolute bottom-0 left-5 top-0 w-px bg-[var(--color-gray-200)] md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          className="h-full origin-top bg-[var(--color-gold)]"
          style={{ scaleY: lineScale }}
        />
      </div>

      <ol className="relative flex flex-col gap-10 md:gap-14 lg:gap-16">
        {milestones.map((milestone, index) => {
          const isRight = index % 2 !== 0

          return (
            <li
              key={`${milestone.year}-${milestone.title}`}
              className="relative grid gap-6 pl-14 md:grid-cols-[1fr_64px_1fr] md:items-center md:gap-6 md:pl-0"
            >
              <div className="hidden md:block">
                {!isRight && (
                  <JourneyCard milestone={milestone} align="right" />
                )}
              </div>

              <motion.div
                className="absolute left-5 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--color-white)] bg-[var(--color-gold)] shadow-[0_0_0_1px_rgba(187,155,80,0.35),0_10px_28px_rgba(187,155,80,0.16)] md:static md:mx-auto md:translate-x-0"
                variants={itemAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: index * 0.06,
                  type: 'spring',
                  stiffness: 240,
                  damping: 20,
                }}
                aria-hidden="true"
              />

              <div className="hidden md:block">
                {isRight && <JourneyCard milestone={milestone} />}
              </div>

              <div className="md:hidden">
                <JourneyCard milestone={milestone} />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default JourneyTimeline
