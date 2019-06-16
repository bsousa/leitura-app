import { RECEIVE_DATA } from '../actions/shared'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        ...action.categories
      }
    default:
      return state
  }
}