import { FC, useState } from 'react'
import styles from '../styles/EditPostForm.module.css'
import post from '../typescript/interface/post'
import LoadingResponse from './UI/LoadingResponse'
import Input from '../components/UI/Input'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

interface Props {
  post: post
  handleEditButton: () => void
}

const EditPostForm: FC<Props> = ({ post, handleEditButton }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.currentTarget.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const newValue = { title, body }
    try {
      const postDocReference = doc(db, 'posts', post.id)
      await updateDoc(postDocReference, newValue)
      setLoading(false)
      setTitle('')
      setBody('')
      handleEditButton()
    } catch (error) {
      setError(true)
    }
  }

  return (
    <form action='#' className={styles.container} onSubmit={handleSubmit}>
      <h5>Edit Post</h5>
      <Input value={title} onChangeFunction={handleChangeTitle} name='title'></Input>
      <Input value={body} onChangeFunction={handleChangeBody} name='body'></Input>
      <button>Update Post</button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </form>
  )
}

export default EditPostForm
