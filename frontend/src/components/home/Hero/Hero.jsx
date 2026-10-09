import { motion } from 'framer-motion'
import { Container } from '../../ui'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import HeroScrollIndicator from './HeroScrollIndicator'
import BrandSpiral from './BrandSpiral'

const spiralAnimation = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
}

const Hero = ({ data }) => {
  return (
    <section
      className="relative -mt-16 flex min-h-[720px] overflow-hidden md:-mt-[70px] lg:min-h-[660px]"
      aria-labelledby="home-hero-title"
    >
      <HeroBackground />
      <Container className="grid min-h-[720px] items-center gap-8 pb-14 pt-24 sm:pt-28 md:pt-32 lg:min-h-[660px] lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.85fr)] lg:gap-8 lg:pb-14 lg:pt-20">
        <div>
          <HeroContent content={data} titleId="home-hero-title" />
        </div>

        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial="hidden"
          animate="visible"
          variants={spiralAnimation}
          transition={{ delay: 0.35, duration: 0.85, ease: 'easeOut' }}
        >
          <div id="spiral-container" className="h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]" aria-label="R S Papal Group brand ecosystem">
            <BrandSpiral />
          </div>
        </motion.div>
      </Container>
      <HeroScrollIndicator />
    </section>
  )
}

export default Hero
