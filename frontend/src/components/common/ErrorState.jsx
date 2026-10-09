import { Button, Container, Heading, Section } from '../ui'

const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  actionLabel,
  onAction,
}) => {
  return (
    <Section spacing="large">
      <Container className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <span
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-danger)] bg-[rgba(194,65,59,0.08)] text-xl font-extrabold text-[var(--color-danger)]"
          aria-hidden="true"
        >
          !
        </span>
        <Heading align="center" title={title} description={description} size="sm" />
        {actionLabel && onAction && (
          <Button type="button" className="mt-8" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Container>
    </Section>
  )
}

export default ErrorState
