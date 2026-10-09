import { Button, Container, Heading, Loader, Section } from '../ui'

const AsyncState = ({
  title,
  description,
  actionLabel,
  onAction,
  loading = false,
}) => {
  return (
    <Section spacing="large" background="default">
      <Container className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        {loading && <Loader size="large" label={title} />}
        <Heading
          align="center"
          title={title}
          description={description}
          size="sm"
          titleAs="h1"
          className="mt-6"
        />
        {actionLabel && onAction && (
          <Button
            type="button"
            variant="primary"
            size="medium"
            className="mt-8"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </Container>
    </Section>
  )
}

export default AsyncState
