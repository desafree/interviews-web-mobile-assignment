import post from '../typescript/interface/post'
import { createContext } from 'react'
import actionPostsReducer from '../typescript/interface/actionPostsReducer'

const postContext = createContext(
  {} as {
    posts: post[]
    dispatch: React.Dispatch<actionPostsReducer>
  },
)

export default postContext
