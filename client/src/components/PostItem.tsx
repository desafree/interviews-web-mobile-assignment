import { FC, useContext, useState } from 'react'
import postContext from '../context/postContext'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'
import LoadingResponse from './UI/LoadingResponse'
import EditPostForm from './EditPostForm'
import PostContent from './PostContent'
import useFetch from '../hooks/useFetch'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  const { loading, error, fetchData } = useFetch()
  const { dispatch } = useContext(postContext)
  const [edit, setEdit] = useState(false)

  const handleDeleteButton = () => {
    fetchData(
      `http://localhost:3001/posts/${post._id}`,
      () => {
        dispatch({ type: 'REMOVE', payload: post })
      },
      {
        method: 'DELETE',
      },
    )
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
