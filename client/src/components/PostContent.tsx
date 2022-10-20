import { FC, useState } from 'react'
import post from '../typescript/interface/post'
import CommentList from '../components/CommentsList'
import styles from '../styles/PostItem.module.css'

interface Props {
  post: post
}

const PostContent: FC<Props> = ({ post }) => {
  const [comment, setComment] = useState(false)
  const handleCommentButton = () => {
    setComment((prevState) => !prevState)
  }

  return (
    <div className={styles.text}>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      <button className={styles.comment} onClick={handleCommentButton}>
        comments <img src={comment ? '/images/arrow-up.svg' : '/images/arrow-down.svg'} alt='' />
      </button>
      {comment && <CommentList postId={post.id} />}
    </div>
  )
}

export default PostContent
