import { FC, useContext, useState } from 'react'
import postContext from '../context/postContext'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'
import LoadingResponse from './UI/LoadingResponse'
import EditPostForm from './EditPostForm'
import CommentList from './CommentsList'
import useFetch from '../hooks/useFetch'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  const { loading, error, fetchData } = useFetch()
  const { dispatch } = useContext(postContext)
  const [edit, setEdit] = useState(false)
  const [comment, setComment] = useState(false)

  const handleCloseButton = () => {
    fetchData(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
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

  const handleCommentButton = () => {
    setComment((prevState) => !prevState)
  }

  return (
    <li className={styles.container}>
      {!edit && (
        <div className={styles.text}>
          <h5>{post.title}</h5>
          <p>{post.body}</p>
          <button className={styles.comment} onClick={handleCommentButton}>
            comments{' '}
            <img src={comment ? '/images/arrow-up.svg' : '/images/arrow-down.svg'} alt='' />
          </button>
          {comment && <CommentList postId={post.id} />}
        </div>
      )}
      {edit && <EditPostForm post={post} handleEditButton={handleEditButton} />}
      <button className={styles.edit} onClick={handleEditButton}>
        Edit
      </button>
      <button className={styles.close} onClick={handleCloseButton}>
        <img src='/images/close.svg' alt='' />
      </button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </li>
  )
}

export default PostItem
