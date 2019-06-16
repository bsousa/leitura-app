import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateScore, handleDeletePost } from '../actions/posts'
import { formatDate } from '../helpers'
import { Link, } from 'react-router-dom'
import { handleLoadComments } from '../actions/comments'
import PostForm from './PostForm';

class Post extends Component {
  state = {
    editMode: false,
  }
  handleVote = (e) => {
    e.preventDefault()

    const { dispatch, post, id } = this.props
    const vote = e.target.id
    dispatch(handleUpdateScore({
      id: id,
      post: post,
      option: vote
    }))
  }
  handleDeletePost = (e) => {
    e.preventDefault()
    const { dispatch, post, id } = this.props

    dispatch(handleDeletePost({
      id: id,
      post,
    }))
  }
  render() {
    const { post, id, dispatch } = this.props

    if (post !== undefined) {
      dispatch(handleLoadComments(post.id))
    }

    return (
      <Link className='post-link' to={`/post/${id}`}>
        {this.state.editMode && (
          <PostForm />
        )}
        {post && (<div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <div className='post'>
            <div className='post-info'>
              {`Posted by ${post.author} on ${formatDate(post.timestamp)} `}
            </div>
            <div className='comment-content'>
              <div className='post-comment'>{post.commentCount}</div>
              <div className='post-comment-icons'>
                <img alt='Comments' className='control-image' width='20px' title='Comments' src={require('../icons/comment.png')} />
              </div>
              <div className='post-comment'>{post.voteScore}</div>
              <div className='post-comment-icons'>
                <img alt='Vote Up' id='upVote' className='control-image' onClick={this.handleVote} width='20px' title='Like' src={require('../icons/like.png')} />
                <img alt='Vote Down' id='downVote' className='control-image' onClick={this.handleVote} width='20px' title='Deslike' src={require('../icons/deslike.png')} />
                <Link className='post-link' to={`/post/edit/${id}`}><img alt='Edit' className='control-image' width='20px' title='Edit' src={require('../icons/edit.png')} /></Link>
                <img alt='Delete' className='control-image' width='20px' onClick={this.handleDeletePost} title='Delete' src={require('../icons/delete.png')} />
              </div>
            </div>
          </div>
          <hr />
        </div>)}
      </Link>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id]
  return {
    post: post,
    id: id
  }
}

export default connect(mapStateToProps)(Post)