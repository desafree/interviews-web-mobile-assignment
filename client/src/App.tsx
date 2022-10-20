import React, { useContext, useEffect, useState } from 'react'
import postContext from './context/postContext'
import PostsList from './components/PostsList'
import NewPostForm from './components/NewPostForm'
import Pagination from './components/Pagination'
import useFetch from './hooks/useFetch'
import LoadingResponse from './components/UI/LoadingResponse'
import './App.css'

function App() {
  const { loading, error, fetchData } = useFetch()
  const { posts, dispatch } = useContext(postContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(7)

  useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/posts/', (json) => {
      dispatch({ type: 'GET', payload: json })
    })
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <NewPostForm></NewPostForm>
      {error && <LoadingResponse value='Something went wrong!' />}
      {loading && !error && <LoadingResponse value='loading...' />}
      {!loading && !error && (
        <>
          <PostsList posts={currentPosts}></PostsList>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  )
}

export default App
