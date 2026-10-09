import { useCallback, useEffect, useMemo, useState } from 'react'

export const useApiResource = (fetcher, emptySelector = Boolean) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetcher()
      setData(response)
    } catch (requestError) {
      setError(requestError)
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    let isMounted = true

    const loadResource = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetcher()

        if (isMounted) {
          setData(response)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadResource()

    return () => {
      isMounted = false
    }
  }, [fetcher])

  const isEmpty = useMemo(() => {
    if (loading || error || !data) {
      return false
    }

    return emptySelector(data)
  }, [data, emptySelector, error, loading])

  return {
    data,
    loading,
    error,
    isEmpty,
    refetch: load,
  }
}
