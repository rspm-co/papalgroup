import Container from './Container'
import Loader from './Loader'
import Section from './Section'

const PageLoader = ({ label = 'Loading page' }) => {
  return (
    <Section spacing="large">
      <Container className="flex min-h-[60vh] items-center justify-center">
        <Loader size="large" label={label} />
      </Container>
    </Section>
  )
}

export default PageLoader
