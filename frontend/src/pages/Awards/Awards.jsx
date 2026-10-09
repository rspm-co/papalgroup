import { useCallback } from 'react'
import AsyncState from '../../components/common/AsyncState'
import AwardsSection from '../../components/home/Awards'
import { useApiResource } from '../../hooks/useApiResource'
import { getAwardsData } from '../../services/api/awards'

const Awards = () => {
  const emptySelector = useCallback(
    (data) => !Array.isArray(data.items) || data.items.length === 0,
    [],
  )
  const awards = useApiResource(getAwardsData, emptySelector)

  if (awards.loading) {
    return (
      <AsyncState
        loading
        title="Loading awards"
        description="Preparing awards and recognition."
      />
    )
  }

  if (awards.error) {
    return (
      <AsyncState
        title="Unable to load awards"
        description="Please try again to refresh award information."
        actionLabel="Try Again"
        onAction={awards.refetch}
      />
    )
  }

  if (awards.isEmpty) {
    return (
      <AsyncState
        title="No awards available"
        description="Awards and recognition will appear here once available."
      />
    )
  }

  return <AwardsSection data={awards.data} />
}

export default Awards
