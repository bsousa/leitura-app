import { RECEIVE_COMMENTS, UPDATE_COMMENT_SCORE, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments
    case UPDATE_COMMENT_SCORE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote'
            ? state[action.id].voteScore += 1
            : state[action.id].voteScore -= 1
        }
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body
        }
      }
    case DELETE_COMMENT:
      return Object.keys(state)
        .map((comment) => state[comment])
        .filter((comment) => comment.id !== action.comment.id)

    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    default:
      return state
  }
}