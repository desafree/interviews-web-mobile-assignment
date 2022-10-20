import { useState } from 'react'
import styles from '../styles/NewPostForm.module.css'
import LoadingResponse from './UI/LoadingResponse'
import Input from './UI/Input'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

const NewPostForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const postsCollectionReference = collection(db, 'posts')

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.currentTarget.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(postsCollectionReference, {
        userId: 1,
        title: title,
        body: body,
      })
      setLoading(false)
      setTitle('')
      setBody('')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <form action='#' className={styles.container} onSubmit={handleSubmit}>
      <h5>Create a new Post</h5>
      <Input value={title} onChangeFunction={handleChangeTitle} name='title'></Input>
      <Input value={body} onChangeFunction={handleChangeBody} name='body'></Input>
      <button>Create Post</button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </form>
  )
}

export default NewPostForm
