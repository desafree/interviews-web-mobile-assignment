import actionPostsReducer from '../typescript/interface/actionPostsReducer'
import post from '../typescript/interface/post'

function postsReducer(state: post[], action: actionPostsReducer) {
  if (action.type === 'UPDATE' && !Array.isArray(action.payload)) {
    const newState = state.map((post) => {
      if (!Array.isArray(action.payload) && post._id === action.payload?._id) return action.payload
      return post
    })
    return newState
  } else if (action.type === 'REMOVE' && !Array.isArray(action.payload)) {
    const newState = state.filter((post) => {
      if (!Array.isArray(action.payload) && post._id !== action.payload?._id) return true
    })
    return newState
  } else if (
    action.type === 'ADD' &&
    !Array.isArray(action.payload) &&
    typeof action.payload === 'object' &&
    action.payload !== null
  ) {
    const id = action.payload._id
    let alreadyInPosts = false
    state.forEach((post) => {
      if (post._id === id) {
        alreadyInPosts = true
      }
    })
    if (alreadyInPosts) return state
    const newState: post[] = [...state, action.payload]
    return newState
  } else if (action.type === 'GET' && Array.isArray(action.payload)) {
    return action.payload
  }

  return state
}

export default postsReducer
