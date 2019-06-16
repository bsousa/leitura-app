import React, { Component } from 'react'
import { formatDate } from '../helpers'
import { connect } from 'react-redux'
import { handleUpdateScore, handleDeleteComment } from '../actions/comments'
import { handleNumberComments } from '../actions/posts'
import CommentForm from './CommentForm';

class Comment extends Component {
  state = {
    editMode: false
  }
  enableEdit = () => {
    this.setState({
      editMode: true,
    })
  }
  cancelEdit = () => {
    this.setState({
      editMode: false
    })
  }
  handleVote = (e) => {
    e.preventDefault()

    const { dispatch, comment, id } = this.props
    const vote = e.target.id

    dispatch(handleUpdateScore({
      id: id,
      comment: comment,
      option: vote
    }))
  }

  handleDeleteComment = (e) => {
    e.preventDefault()
    const { dispatch, comment, id, postId } = this.props
    
 

    dispatch(handleDeleteComment({
      id: id,
      comment,
    }))


  }

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { comment, id } = this.props
    return (
      <div>
        {this.state.editMode && (
          <div>
            <CommentForm id={id} cancelEdit={this.cancelEdit} />
          </div>
        )}
        {!this.state.editMode && (
          <div className='comment-content'>
            <div className='comment-date'>{`${formatDate(comment.timestamp)} - ${comment.author} `}</div>
            <div className='comment-text'>{comment.body}</div>
            {!this.state.editMode && (
              <div className='icons-content'>
                <div className='post-comment'>{comment.voteScore}</div>
                <div className='post-comment-icons'>
                  <img alt='Vote Up' id='upVote' className='control-image' onClick={this.handleVote} width='20px' title='Like' src={require('../icons/like.png')} />
                  <img alt='Vote Down' id='downVote' className='control-image' onClick={this.handleVote} width='20px' title='Deslike' src={require('../icons/deslike.png')} />
                  <img alt='Edit' className='control-image' width='20px' onClick={this.enableEdit} title='Edit' src={require('../icons/edit.png')} />
                  <img alt='Delete' className='control-image' width='20px' onClick={this.handleDeleteComment} title='Delete' src={require('../icons/delete.png')} />
                </div>
              </div>
            )}
          </div>)}
        <hr />
      </div>
    )
  }
}

function mapStateToProps({ comments }, { id }) {
  const comment = comments[id]
  return {
    comment: comment,
    id: id
  }
}

export default connect(mapStateToProps)(Comment)