import { useState } from 'react'
import CheckErrorInResponse from '../utils/checkErrorInResponse'

const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function fetchData(url: string, cb: (json: any) => void, obj?: any) {
    console.log(url)
    setLoading(true)
    fetch(url, obj)
      .then(CheckErrorInResponse)
      .then((json) => {
        console.log(json)
        cb(json)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError(true)
      })
  }

  return { loading, error, fetchData }
}

export default useFetch
