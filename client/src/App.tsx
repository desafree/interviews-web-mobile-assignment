import React, { useContext, useEffect } from 'react'
import postContext from './context/postContext'
import CheckErrorInResponse from './utils/chekErrorInResponse'
import PostsList from './components/PostsList'
import './App.css'

function App() {
  const { dispatch } = useContext(postContext)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(CheckErrorInResponse)
      .then((json) => {
        dispatch({ type: 'GET', payload: json })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <PostsList></PostsList>
    </>
  )
}

export default App
