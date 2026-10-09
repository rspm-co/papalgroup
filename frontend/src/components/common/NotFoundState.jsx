import { Link } from 'react-router-dom'
import { Container, Heading, Section } from '../ui'
import { routePaths } from '../../constants/navigation'
import {
  buttonBaseClasses,
  buttonSizes,
  buttonVariants,
} from '../../styles/theme'
import { classNames } from '../../utils/classNames'

const NotFoundState = ({
  title = 'Page Not Found',
  description = 'The page you are looking for may have moved or is not available.',
}) => {
  return (
    <Section spacing="large">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-gold)]">
          404
        </p>
        <Heading align="center" title={title} description={description} size="md" />
        <Link
          to={routePaths.home}
          className={classNames(
            buttonBaseClasses,
            buttonVariants.primary,
            buttonSizes.medium,
            'mt-8',
          )}
        >
          Back to Home
        </Link>
      </Container>
    </Section>
  )
}

export default NotFoundState
