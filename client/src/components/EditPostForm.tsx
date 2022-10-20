import { FC, useContext, useState } from 'react'
import postContext from '../context/postContext'
import styles from '../styles/EditPostForm.module.css'
import post from '../typescript/interface/post'
import useFetch from '../hooks/useFetch'
import LoadingResponse from './UI/LoadingResponse'

interface Props {
  post: post
  handleEditButton: () => void
}

const EditPostForm: FC<Props> = ({ post, handleEditButton }) => {
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
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      (json) => {
        dispatch({ type: 'UPDATE', payload: json })
        setTitle('')
        setBody('')
        handleEditButton()
      },
      {
        method: 'PUT',
        body: JSON.stringify({
          ...post,
          title: title,
          body: body,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
  }

  return (
    <form action='#' className={styles.container} onSubmit={handleSubmit}>
      <h5>Edit Post</h5>
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
      <button>Update Post</button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </form>
  )
}

export default EditPostForm
