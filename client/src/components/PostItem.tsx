import { FC, useContext } from 'react'
import postContext from '../context/postContext'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'
import CheckErrorInResponse from '../utils/checkErrorInResponse'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  const { dispatch } = useContext(postContext)

  const handleCloseButton = async () => {
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

  return (
    <li className={styles.container}>
      <div className={styles.text}>
        <h5>{post.title}</h5>
        <p>{post.body}</p>
      </div>
      <button className={styles.close} onClick={handleCloseButton}>
        <img src='/images/close.svg' alt='' />
      </button>
    </li>
  )
}

export default PostItem
