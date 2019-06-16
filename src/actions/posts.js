import { updatePostScore, newPost, deletePostByID, updateInfoPost } from '../API'
import { showLoading, hideLoading } from 'react-redux-loading'
import { default as UUID } from "uuid"

export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_NUMBER_COMMENTS = 'UPDATE_NUMBER_COMMENTS'



function updateNumberComments(id, option) {
  return {
    type: UPDATE_NUMBER_COMMENTS,
    id,
    option,
  }
}

export function handleNumberComments(info) {
  return (dispatch) => {
    dispatch(updateNumberComments(info.id, info.option))
  }
}


function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function handleAddPost(author, title, text, category) {
  return (dispatch) => {

    const date = new Date()
    const timestamp = (date / 1000 | 0)
    const id = UUID.v4()

    dispatch(showLoading())

    return newPost({
      id,
      author,
      title,
      body: text,
      category,
      timestamp
    })
      .then((post) => dispatch(addPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

function updateScore({ id, option }) {
  return {
    type: UPDATE_POST_SCORE,
    id,
    option
  }
}

export function handleUpdateScore(info) {
  return (dispatch) => {
    dispatch(updateScore(info))
    return updatePostScore(info.post.id, info.option)
      .catch((e) => {
        console.warn('Error handleUpdateScore: ', e)
        dispatch(updateScore(info))
        alert('The was error vote the post. Try Again')
      })
  }
}


function deletePost({ id, post }) {
  return {
    type: DELETE_POST,
    id,
    post
  }
}

export function handleDeletePost(info) {
  return (dispatch) => {
    dispatch(deletePost(info))
    return deletePostByID(info.post.id)
      .catch((e) => {
        console.warn('Error handleUpdate: ', e)
        dispatch(deletePost(info))
        alert('The was error delete post. Try Again')
      })
  }
}

function updatePost({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body,
  }
}

export function handleUpdatePost(info) {
  return (dispatch) => {
    dispatch(updatePost(info))
    return updateInfoPost(info.id, info.title, info.body)
      .catch((e) => {
        console.warn('Error handleUpdate: ', e)
        dispatch(updatePost(info))
        alert('The was error edit post. Try Again')
      })
  }
}