import { useState } from 'react'
import CheckErrorInResponse from '../utils/checkErrorInResponse'

const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function fetchData(url: string, cb: (json: any) => void, obj?: any) {
    setLoading(true)
    fetch(url, obj)
      .then(CheckErrorInResponse)
      .then((json) => {
        cb(json)
        setLoading(false)
      })
      .catch((error) => {
        setError(true)
      })
  }

  return { loading, error, fetchData }
}

export default useFetch
