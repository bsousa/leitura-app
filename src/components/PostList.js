import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

function PostList(props) {
  return (
    <div class="post-list">
          <Post />
          <Post />
          <Post />
          <Post />
    </div>
  )
}

PostList.propTypes = {

}
export default PostList