import { FC } from 'react'
import post from '../typescript/interface/post'
import styles from '../styles/PostItem.module.css'

interface Props {
  post: post
}

const PostItem: FC<Props> = ({ post }) => {
  return (
    <li className={styles.container}>
      <div className={styles.text}>
        <h5>{post.title}</h5>
        <p>{post.body}</p>
      </div>
    </li>
  )
}

export default PostItem
