import PostItem from './PostItem'
import styles from '../styles/PostsList.module.css'
import post from '../typescript/interface/post'
import { FC } from 'react'

interface Props {
  posts: post[]
}

const PostsList: FC<Props> = ({ posts }) => {
  return (
    <>
      <h4 className={styles.title}>Posts</h4>
      <ul className={styles.container}>
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />
        })}
      </ul>
    </>
  )
}

export default PostsList
