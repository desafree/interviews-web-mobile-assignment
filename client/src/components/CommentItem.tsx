import { FC } from 'react'
import styles from '../styles/CommentItem.module.css'
import comment from '../typescript/interface/comment'

interface Props {
  comment: comment
}

const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <li className={styles.container}>
      <h6>{comment.email}</h6>
      <p>{comment.body}</p>
    </li>
  )
}

export default CommentItem
