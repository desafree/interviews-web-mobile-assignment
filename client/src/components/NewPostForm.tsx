import { useContext, useState } from 'react'
import postContext from '../context/postContext'
import styles from '../styles/NewPostForm.module.css'
import useFetch from '../hooks/useFetch'
import LoadingResponse from './UI/LoadingResponse'

const NewPostForm = () => {
  const { loading, error, fetchData } = useFetch()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { dispatch } = useContext(postContext)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    callback(e.currentTarget.value)
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
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          required
          onChange={(e) => {
            handleChange(e, setTitle)
          }}
          value={title}
        />
      </div>
      <div>
        <label htmlFor='body'>Text:</label>
        <input
          type='text'
          id='body'
          name='body'
          required
          onChange={(e) => {
            handleChange(e, setBody)
          }}
          value={body}
        />
      </div>
      <button>Create Post</button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </form>
  )
}

export default NewPostForm
