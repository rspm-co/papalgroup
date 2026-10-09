import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui'
import { routePaths } from '../../../constants/navigation'

const CTAButtons = ({
  primaryLabel = 'Become a Franchise Partner',
  secondaryLabel = 'Explore Our Brands',
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
      <Button
        type="button"
        size="large"
        variant="primary"
        fullWidth
        className="border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-white)] hover:bg-[var(--color-dark-gold)] hover:shadow-[0_16px_42px_rgba(187,155,80,0.24)] sm:w-auto"
        onClick={() => navigate(routePaths.contact)}
        aria-label={primaryLabel}
      >
        {primaryLabel}
      </Button>
      <Button
        type="button"
        size="large"
        variant="outline"
        fullWidth
        className="border-[rgba(255,255,255,0.5)] text-[var(--color-white)] hover:border-[var(--color-white)] hover:bg-[rgba(255,255,255,0.08)] sm:w-auto"
        onClick={() => navigate(routePaths.brands)}
        aria-label={secondaryLabel}
      >
        {secondaryLabel}
      </Button>
    </div>
  )
}

export default CTAButtons
