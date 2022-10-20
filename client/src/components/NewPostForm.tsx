import { useContext, useState } from 'react'
import postContext from '../context/postContext'
import styles from '../styles/NewPostForm.module.css'
import useFetch from '../hooks/useFetch'
import LoadingResponse from './UI/LoadingResponse'
import Input from './UI/Input'

const NewPostForm = () => {
  const { loading, error, fetchData } = useFetch()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { dispatch } = useContext(postContext)

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchData(
      'https://jsonplaceholder.typicode.com/posts',
      (json) => {
        dispatch({ type: 'ADD', payload: json })
        setTitle('')
        setBody('')
      },
      {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
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
