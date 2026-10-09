import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui'

const HeroCTA = ({ actions }) => {
  const navigate = useNavigate()
  const primaryAction = actions?.primary
  const secondaryAction = actions?.secondary

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {primaryAction && (
        <Button
          size="large"
          variant="primary"
          fullWidth
          className="sm:w-auto"
          onClick={() => navigate(primaryAction.path)}
          aria-label={primaryAction.label}
        >
          {primaryAction.label}
        </Button>
      )}
      {secondaryAction && (
        <Button
          size="large"
          variant="secondary"
          fullWidth
          className="sm:w-auto"
          onClick={() => navigate(secondaryAction.path)}
          aria-label={secondaryAction.label}
        >
          {secondaryAction.label}
        </Button>
      )}
    </div>
  )
}

export default HeroCTA
