import AsyncState from '../../components/common/AsyncState'
import Achievements from '../../components/home/Achievements'
import Awards from '../../components/home/Awards'
import Brands from '../../components/home/Brands'
import Hero from '../../components/home/Hero'
import Journey from '../../components/home/Journey'
import Moments from '../../components/home/Moments'
import { useWebsite } from '../../hooks/useWebsite'

const Home = () => {
  const { homepage } = useWebsite()

  if (homepage.loading) {
    return (
      <AsyncState
        loading
        title="Loading homepage"
        description="Preparing the R S PAPAL GROUP experience."
      />
    )
  }

  if (homepage.error) {
    return (
      <AsyncState
        title="Unable to load homepage"
        description="Please try again to refresh the latest website content."
        actionLabel="Try Again"
        onAction={homepage.refetch}
      />
    )
  }

  if (homepage.isEmpty) {
    return (
      <AsyncState
        title="No homepage content available"
        description="Content will appear here once it is available."
      />
    )
  }

  return (
    <>
      <Hero data={homepage.data.hero} />
      <Journey data={homepage.data.journey} />
      <Brands data={homepage.data.brands} />
      <Achievements data={homepage.data.achievements} />
      <Moments data={homepage.data.gallery} />
      <Awards data={homepage.data.awards} />
    </>
  )
}

export default Home
