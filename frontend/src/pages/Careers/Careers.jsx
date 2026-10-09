import {
  ApplicationCTA,
  Benefits,
  OpenPositions,
  WhyJoinUs,
  benefits,
  jobs,
  whyJoinFeatures,
} from '../../components/careers'

const Careers = () => {
  return (
    <>
      <WhyJoinUs features={whyJoinFeatures} />
      <Benefits benefits={benefits} />
      <OpenPositions jobs={jobs} />
      <ApplicationCTA />
    </>
  )
}

export default Careers
