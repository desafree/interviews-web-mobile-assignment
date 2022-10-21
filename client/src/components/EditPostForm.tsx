import { FC, useContext, useState } from 'react'
import postContext from '../context/postContext'
import styles from '../styles/EditPostForm.module.css'
import post from '../typescript/interface/post'
import useFetch from '../hooks/useFetch'
import LoadingResponse from './UI/LoadingResponse'
import Input from '../components/UI/Input'

interface Props {
  post: post
  handleEditButton: () => void
}

const EditPostForm: FC<Props> = ({ post, handleEditButton }) => {
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
      `https://jsonplaceholder.typicode.com/posts/${post._id}`,
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
      <Input value={title} onChangeFunction={handleChangeTitle} name='title'></Input>
      <Input value={body} onChangeFunction={handleChangeBody} name='body'></Input>
      <button>Update Post</button>
      {loading && !error && <LoadingResponse value='loading...' />}
      {error && <LoadingResponse value='Something went wrong!' />}
    </form>
  )
}

export default EditPostForm
