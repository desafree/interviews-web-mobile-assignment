import post from './post'
import actionType from '../types/actionType'

interface actionPostsReducer {
  type: actionType
  payload: post | post[]
}

export default actionPostsReducer
