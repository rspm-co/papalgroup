import AboutCTA from '../../components/about/AboutCTA'
import ChairmanMessage from '../../components/about/ChairmanMessage'
import CoreValues from '../../components/about/CoreValues'
import GrowthTimeline from '../../components/about/GrowthTimeline'
import MissionVision from '../../components/about/MissionVision'
import LeadershipTeam from '../../components/about/LeadershipTeam'
import WhoWeAre from '../../components/about/WhoWeAre'
import WhyChooseUs from '../../components/about/WhyChooseUs'

const About = () => {
  return (
    <>
      <WhoWeAre />
      <ChairmanMessage />
      <LeadershipTeam />
      <MissionVision />
      <CoreValues />
      <GrowthTimeline />
      <WhyChooseUs />
      <AboutCTA />
    </>
  )
}

export default About
