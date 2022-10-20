import { FC, useState } from 'react'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'
import LoadingResponse from './UI/LoadingResponse'
import EditPostForm from './EditPostForm'
import PostContent from './PostContent'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleDeleteButton = () => {
    // fetchData(
    //   `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    //   () => {
    //     dispatch({ type: 'REMOVE', payload: post })
    //   },
    //   {
    //     method: 'DELETE',
    //   },
    // )
  }

  const handleEditButton = () => {
    setEdit((prevState) => !prevState)
  }

  return (
    <li className={styles.container}>
      {!edit && <PostContent post={post} />}
      {edit && <EditPostForm post={post} handleEditButton={handleEditButton} />}
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
      <button className={styles.edit} onClick={handleEditButton}>
        Edit
      </button>
      <button className={styles.close} onClick={handleDeleteButton}>
        <img src='/images/close.svg' alt='' />
      </button>
    </li>
  )
}

export default PostItem
