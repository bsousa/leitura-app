import React, { Component } from 'react'
import { handleAddComment, handleUpdateComment} from '../actions/comments'
import { handleNumberComments } from '../actions/posts'
import { connect } from 'react-redux'

class CommentForm extends Component {
  state = {
    author: '',
    text: '',
  }
  componentWillMount(){
    if (this.props.comment !== undefined) {
      this.setState({
        author: this.props.comment.author,
        text: this.props.comment.body,
      })
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    if (this.props.comment == null) {
      const { dispatch } = this.props
      dispatch(handleAddComment(this.state.author, this.state.text, this.props.id))
      dispatch(
        handleNumberComments({
          id: this.props.id, 
          option: 'add'
        }))
    } else {
      const { dispatch, comment, id } = this.props
      dispatch(handleUpdateComment({
        id: id,
        comment,
        body: this.state.text,
      }))
      this.props.cancelEdit()
    }

    this.setState({
      author: '',
      text: '',
    })

  }

  checkFields() {
    return this.state.text === '' || this.state.author === ''
  }
  render() {
    
    return (
      <form className='new-comment' onSubmit={this.handleSubmit}>
        <input name='author' onChange={this.handleChange} value={this.state.author} type="text" className="comment-author" placeholder="Author" />
        <input name='text' onChange={this.handleChange} value={this.state.text} type="text" className="comment-input" placeholder="New comment" />
        <input type="submit" name='publish' disabled={this.checkFields()} value="Publish" className="comment-button" />
      </form>
    )
  }
}
function mapStateToProps({ comments, dispatch }, { id }) {
  const comment = comments[id]
  return {
    comment,
    dispatch
  }
}

export default connect(mapStateToProps)(CommentForm)