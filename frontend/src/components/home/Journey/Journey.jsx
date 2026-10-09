import { Container, Heading, Section } from '../../ui'
import JourneyTimeline from './JourneyTimeline'

const Journey = ({ data }) => {
  const section = data?.section

  return (
    <Section
      spacing="large"
      background="default"
      className="relative overflow-hidden"
      aria-label={section?.title}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.026)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5)_18%,rgba(0,0,0,0.5)_82%,transparent)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <Heading
          align="center"
          title={section?.title}
          subtitle={section?.subtitle}
          size="md"
          titleAs="h2"
          className="mx-auto"
          titleClassName="scroll-mt-28"
        />
        <JourneyTimeline milestones={data?.milestones || []} />
      </Container>
    </Section>
  )
}

export default Journey
