import { Container, Heading, Section } from '../ui'

const PagePlaceholder = ({ eyebrow, title, description }) => {
  return (
    <Section spacing="large" background="default">
      <Container>
        <Heading
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
          size="md"
          titleAs="h1"
          className="mx-auto"
        />
      </Container>
    </Section>
  )
}

export default PagePlaceholder
