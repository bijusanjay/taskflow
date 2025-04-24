import { useCallback, useEffect, useState } from 'react'

type FetchFunction<T> = (
  ...args: (string | undefined)[]
) => Promise<{ data: T; err?: undefined } | { err: string; data?: undefined }>

const useFetch = <T>(fetchFunction: FetchFunction<T>, ...args: (string | undefined)[]) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, err } = await fetchFunction.call(null, ...args)
    if (data) {
      setData(data)
    }
    if (err) {
      setError(err)
    }
    setLoading(false)
  }, [fetchFunction, ...args])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, error, loading, refetch: fetchData }
}

export default useFetch
