import { getAll, getCategories } from '../API'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData(posts, categories) {
  return {
    type: RECEIVE_DATA,
    posts,
    categories,
  }
}

function preparePosts(posts) {
  let preparedPosts = {}

  Object.keys(posts).forEach((key) => {
    let post = posts[key]
    preparedPosts[post.id] = post
  })
  return preparedPosts
}

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([
      getAll(),
      getCategories()
    ]).then(([posts, categories]) => {
      let preparedPosts = preparePosts(posts)
      dispatch(receiveData(preparedPosts, categories))
      dispatch(hideLoading())
    })
  }
}