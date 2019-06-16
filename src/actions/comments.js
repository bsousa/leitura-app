import { showLoading, hideLoading } from 'react-redux-loading'
import { getComments, updateCommentScore, newComment, updateTextComment, deleteCommentByID } from '../API'
import {default as UUID} from "uuid"
import { handleNumberComments } from './posts'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function prepareComments(comments) {
  let preparedComments = {}

  Object.keys(comments).forEach((key) => {
    let comment = comments[key]
    preparedComments[comment.id] = comment
  })
  return preparedComments
}

export function handleLoadComments (PostId){
  return (dispatch) => {
    dispatch(showLoading())
    getComments(PostId)
    .then ((comments) => {
        let preparedComments = prepareComments(comments)
        dispatch(receiveComments(preparedComments))
        dispatch(hideLoading())
      })
  }
}

function updateScore({id, option}){
  return {
    type: UPDATE_COMMENT_SCORE,
    id,
    option
  }
}

export function handleUpdateScore(info) {
  return (dispatch) => {
    dispatch(updateScore(info))
    return updateCommentScore(info.comment.id, info.option) 
      .catch ((e) => {
        console.warn('Error handleUpdateScore: ', e)
        dispatch(updateScore(info))
        alert('The was error vote the post. Try Again')
      })
  }
}

function updateComment({id, comment, body}){
  return {
    type: UPDATE_COMMENT,
    id,
    comment,
    body
  }
}

export function handleUpdateComment(info) {
  return (dispatch) => {
    dispatch(updateComment(info))
    return updateTextComment(info.comment.id, info.body) 
      .catch ((e) => {
        console.warn('Error handleUpdate: ', e)
        dispatch(updateComment(info))
        alert('The was error edit comment. Try Again')
      })
  }
}

function deleteComment({id, comment}){
  return {
    type: DELETE_COMMENT,
    id,
    comment
  }
}

export function handleDeleteComment(info) {
  return (dispatch) => {
    dispatch(deleteComment(info))
    return deleteCommentByID(info.comment.id) 
      .then (() => {
        dispatch(
          handleNumberComments({
            id: info.comment.parentId, 
            option: 'del'
          }))
      })
      .catch ((e) => {
        console.warn('Error handleUpdate: ', e)
        dispatch(deleteComment(info))
        alert('The was error delete comment. Try Again')
      })
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment(author, text, parentId){
  return (dispatch) => {

      const date = new Date()
      const timestamp = (date / 1000 | 0 )
      const id = UUID.v4()

      dispatch(showLoading())

      return newComment({
        id,
        author,
        body: text,
        parentId,
        timestamp
      })
      .then ((comment) => dispatch(addComment(comment)))
      .then(() => dispatch(hideLoading()))
  }
}