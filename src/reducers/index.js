import { combineReducers} from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import { loadingBarReducer } from 'react-redux-loading'
import '../App.css'

export default combineReducers({
  posts,
  categories,
  comments,
  loadingBar: loadingBarReducer,
})