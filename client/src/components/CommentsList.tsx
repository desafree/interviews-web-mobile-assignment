import { FC, useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import comment from '../typescript/interface/comment'
import styles from '../styles/CommentsList.module.css'
import LoadingResponse from './UI/LoadingResponse'

interface Props {
  postId: string
}

const CommentList: FC<Props> = ({ postId }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [comments, setComments] = useState<comment[]>([])

  useEffect(() => {
    // fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, (json) => {
    //   setComments(json)
    // })
  }, [])

  return (
    <>
      {error && <LoadingResponse value='Something went wrong!' />}
      {loading && !error && <LoadingResponse value='loading...' />}
      {!loading && !error && (
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
