import post from './post'

interface actionPostsReducer {
  type: string
  payload: post | post[]
}

export default actionPostsReducer
