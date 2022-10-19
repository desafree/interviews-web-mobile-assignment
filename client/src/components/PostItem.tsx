import { FC, useContext, useState } from 'react'
import postContext from '../context/postContext'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'
import CheckErrorInResponse from '../utils/checkErrorInResponse'
import EditPostForm from './EditPostForm'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  const { dispatch } = useContext(postContext)
  const [edit, setEdit] = useState(false)

  const handleCloseButton = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'DELETE',
    })
      .then(CheckErrorInResponse)
      .then(() => {
        dispatch({ type: 'REMOVE', payload: post })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEditButton = () => {
    setEdit((prevState) => !prevState)
  }

  return (
    <li className={styles.container}>
      {!edit && (
        <div className={styles.text}>
          <h5>{post.title}</h5>
          <p>{post.body}</p>
        </div>
      )}
      {edit && <EditPostForm post={post} handleEditButton={handleEditButton} />}
      <button className={styles.edit} onClick={handleEditButton}>
        Edit
      </button>
      <button className={styles.close} onClick={handleCloseButton}>
        <img src='/images/close.svg' alt='' />
      </button>
    </li>
  )
}

export default PostItem
