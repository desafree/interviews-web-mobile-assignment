import React, { useContext, useEffect } from 'react'
import postContext from './context/postContext'
import './App.css'

function App() {
  const { dispatch } = useContext(postContext)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: 'GET', payload: json })
      })
  }, [])

  return <>App</>
}

export default App
