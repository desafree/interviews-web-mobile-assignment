import React, { useContext, useEffect, useState } from 'react'
import postContext from './context/postContext'
import CheckErrorInResponse from './utils/checkErrorInResponse'
import PostsList from './components/PostsList'
import NewPostForm from './components/NewPostForm'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const { posts, dispatch } = useContext(postContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(7)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
      <NewPostForm></NewPostForm>
      <PostsList posts={currentPosts}></PostsList>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  )
}

export default App
