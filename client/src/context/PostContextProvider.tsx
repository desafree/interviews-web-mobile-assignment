import { FC, useReducer } from 'react'
import postContext from './postContext'
import postsReducer from '../utils/postsReducer'
import post from '../typescript/interface/post'

interface Props {
  children: React.ReactNode
}

const PostContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, [] as post[])
  return <postContext.Provider value={{ posts: state, dispatch }}>{children}</postContext.Provider>
}

export default PostContextProvider
