import { useContext } from 'react'
import postsContext from '../context/postContext'
import PostItem from './PostItem'
import styles from '../styles/PostsList.module.css'

const PostsList = () => {
  const { posts } = useContext(postsContext)
  return (
    <>
      <h4 className={styles.title}>Posts</h4>
      <ul className={styles.container}>
        {posts.map((post) => {
          return <PostItem key={post.id} post={post} />
        })}
      </ul>
    </>
  )
}

export default PostsList
