import { Timestamp } from 'firebase/firestore'

interface Post {
  userId: number
  id: string
  title: string
  body: string
  createdAt: Timestamp
}

export default Post
