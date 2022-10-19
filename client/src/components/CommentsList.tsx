import { FC, useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import CheckErrorInResponse from '../utils/checkErrorInResponse'
import comment from '../typescript/interface/comment'
import styles from '../styles/CommentsList.module.css'

interface Props {
  postId: number
}

const CommentList: FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<comment[]>([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(CheckErrorInResponse)
      .then((json) => {
        setComments(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <ul className={styles.container}>
          {comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />
          })}
        </ul>
      )}
    </>
  )
}

export default CommentList
