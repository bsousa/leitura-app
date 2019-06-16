import { UPDATE_POST_SCORE, ADD_POST, DELETE_POST, UPDATE_POST, UPDATE_NUMBER_COMMENTS } from '../actions/posts'
import { RECEIVE_DATA } from '../actions/shared'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        ...action.posts
      }
    case UPDATE_POST_SCORE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote'
            ? state[action.id].voteScore += 1
            : state[action.id].voteScore -= 1
        }
      }
    case UPDATE_NUMBER_COMMENTS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          commentCount: action.option === 'add'
            ? state[action.id].commentCount += 1
            : state[action.id].commentCount -= 1
        }
      }
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case DELETE_POST:
      let filter = {}
      Object.keys(state).forEach((key) => {
        if (state[key].id !== action.id) {
          filter[state[key].id] = state[key]
        }
      })
      return filter
    case UPDATE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body,
          title: action.title
        }
      }
    default:
      return state
  }
}