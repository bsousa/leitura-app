import React, { Component } from 'react'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { connect } from 'react-redux'
import Post from './Post'

class PostDetails extends Component {

  state = {
    sortBy: 'score-high-to-low',
  }

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { post, id } = this.props
    return (
      <div className='post-list'>
        <div className='menu-sort'>
          <span className='menu-title'>Sort by: </span>
          <select name='sortBy' className='appearance-select' value={this.state.sortBy} onChange={this.handleChangeInput}>
            <option value='score-high-to-low'>Score, high to low</option>
            <option value='score-low-to-high'>Score, low to high</option>
            <option value='date-new-to-old'>Date, new to old</option>
            <option value='date-old-to-new'>Date, old to new</option>
          </select>
        </div>
        {post && (<div>
          <Post id={id} />
          <div>
            <CommentList PostId={id} sortBy={this.state.sortBy} />
          </div>
          <div>
            <CommentForm id={post.id} />
          </div>
        </div>)}
      </div>
    )
  }
}


function mapStateToProps({ posts }, props) {
  const { id } = props.match.params
  const post = posts[id]

  return {
    id: id,
    post,
  }
}
export default connect(mapStateToProps)(PostDetails)