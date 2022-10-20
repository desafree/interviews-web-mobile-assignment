import React, { useEffect, useState } from 'react'
import PostsList from './components/PostsList'
import NewPostForm from './components/NewPostForm'
import Pagination from './components/Pagination'
import LoadingResponse from './components/UI/LoadingResponse'
import './App.css'
import { collection, onSnapshot } from 'firebase/firestore'
import post from './typescript/interface/post'
import { db } from './firebase-config'

function App() {
  const [posts, setPosts] = useState<post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(7)
  const postsCollectionReference = collection(db, 'posts')

  useEffect(() => {
    const unsubscribeFromListener = onSnapshot(
      postsCollectionReference,
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as post
          }),
        )
        setLoading(false)
      },
      () => {
        setError(true)
      },
    )
    return () => {
      unsubscribeFromListener()
    }
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
