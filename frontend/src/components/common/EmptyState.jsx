import { Button, Container, Heading, Section } from '../ui'

const EmptyState = ({
  title = 'No content available',
  description = 'Content will appear here once it is available.',
  actionLabel,
  onAction,
}) => {
  return (
    <Section spacing="large">
      <Container className="flex min-h-[45vh] flex-col items-center justify-center text-center">
        <Heading align="center" title={title} description={description} size="sm" />
        {actionLabel && onAction && (
          <Button type="button" variant="secondary" className="mt-8" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Container>
    </Section>
  )
}

export default EmptyState
