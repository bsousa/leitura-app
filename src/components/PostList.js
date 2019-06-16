import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'

class PostList extends Component {
  componentWillReceiveProps() {
    if (this.props.postsIds !== undefined && this.loadProps === undefined) {
      this.setState({
        sortBy: 'score-high-to-low',
        postsIds: this.props.postsIds,
      })
    }
  }

  state = {
    sortBy: 'score-high-to-low',
    postsIds: this.props.postsIds,
  }
  handleChangeInput = (event) => {
    this.loadProps = false
    const { posts } = this.props
    let postsIds = []

    switch (event.target.value) {
      case 'score-high-to-low':
        postsIds = Object.keys(posts).sort((a, b) => posts[b].voteScore - posts[a].voteScore)
        break;
      case 'score-low-to-high':
        postsIds = Object.keys(posts).sort((a, b) => posts[a].voteScore - posts[b].voteScore)
        break;
      case 'date-new-to-old':
        postsIds = Object.keys(posts).sort((a, b) => posts[b].timestamp - posts[a].timestamp)
        break;
      case 'date-old-to-new':
        postsIds = Object.keys(posts).sort((a, b) => posts[a].timestamp - posts[b].timestamp)
        break;
      default:
        postsIds = Object.keys(posts).sort((a, b) => posts[b].voteScore - posts[a].voteScore)
    }

    this.setState({
      postsIds: postsIds,
      [event.target.name]: event.target.value
    })
  }
  render() {
    let loadProps = true

    return (
      <div>
        <div className='menu-sort-post'>
          <span className='menu-title'>Sort by: </span>
          <select name='sortBy' className='appearance-select' value={this.state.sortBy} onChange={this.handleChangeInput}>
            <option value='score-high-to-low'>Score, high to low</option>
            <option value='score-low-to-high'>Score, low to high</option>
            <option value='date-new-to-old'>Date, new to old</option>
            <option value='date-old-to-new'>Date, old to new</option>
          </select>
        </div>
        <div className='post-list'>
          {this.state.postsIds.map((id) => (
            <Post id={id} />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {

  const { category } = props.match.params
  let listPosts = {}

  let postByCategories = {}

  Object.keys(posts).forEach((key) => {
    if (posts[key].category === category) {
      postByCategories[posts[key].id] = posts[key]
    }
  })

  listPosts = category !== undefined ? postByCategories : posts

  return {
    posts: listPosts,
    postsIds: Object.keys(listPosts)
      .sort((a, b) => listPosts[b].voteScore - listPosts[a].voteScore)
  }
}
export default connect(mapStateToProps)(PostList)