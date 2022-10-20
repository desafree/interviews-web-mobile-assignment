import { FC, useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import comment from '../typescript/interface/comment'
import styles from '../styles/CommentsList.module.css'
import LoadingResponse from './UI/LoadingResponse'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'

interface Props {
  postId: string
}

const CommentList: FC<Props> = ({ postId }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [comments, setComments] = useState<comment[]>([])
  const commentsCollectionReference = collection(db, 'comments')

  useEffect(() => {
    async function getComments() {
      setLoading(true)

      try {
        const q = query(commentsCollectionReference, where('postId', '==', postId))
        const querySnapshot = await getDocs(q)
        const comments: comment[] = []
        querySnapshot.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id } as comment)
        })
        setComments(comments)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }

    getComments()
  }, [])

  return (
    <>
      {error && <LoadingResponse value='Something went wrong!' />}
      {loading && !error && <LoadingResponse value='loading...' />}
      {!loading && !error && comments.length > 0 && (
        <ul className={styles.container}>
          {comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />
          })}
        </ul>
      )}
      {!loading && !error && comments.length === 0 && (
        <ul className={styles.container}>
          <p>No comments...</p>
        </ul>
      )}
    </>
  )
}

export default CommentList
