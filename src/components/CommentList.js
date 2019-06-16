import React, { Component } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.commentsIds.map((comment) => (
            <Comment id={comment} />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }, { sortBy }) {
  switch (sortBy) {
    case 'score-high-to-low':
      return { commentsIds: Object.keys(comments).sort((a, b) => comments[b].voteScore - comments[a].voteScore) }
    case 'score-low-to-high':
      return { commentsIds: Object.keys(comments).sort((a, b) => comments[a].voteScore - comments[b].voteScore) }
    case 'date-new-to-old':
      return { commentsIds: Object.keys(comments).sort((a, b) => comments[b].timestamp - comments[a].timestamp) }
    case 'date-old-to-new':
      return { commentsIds: Object.keys(comments).sort((a, b) => comments[a].timestamp - comments[b].timestamp) }
    default:
      return { commentsIds: Object.keys(comments).sort((a, b) => comments[b].voteScore - comments[a].voteScore) }
  }

}
export default connect(mapStateToProps)(CommentList)