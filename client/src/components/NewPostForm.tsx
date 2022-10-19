import { useContext, useState } from 'react'
import postContext from '../context/postContext'
import styles from '../styles/NewPostForm.module.css'
import CheckErrorInResponse from '../utils/checkErrorInResponse'

const NewPostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { dispatch } = useContext(postContext)

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    callback(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(CheckErrorInResponse)
      .then((json) => {
        dispatch({ type: 'ADD', payload: json })
        setTitle('')
        setBody('')
      })
      .catch((error) => {
        console.log(error)
      })
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
            handleChangeTitle(e, setTitle)
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
            handleChangeTitle(e, setBody)
          }}
          value={body}
        />
      </div>
      <button>Create Post</button>
    </form>
  )
}

export default NewPostForm
