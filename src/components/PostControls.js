import React from 'react'
import PropTypes from 'prop-types'

function PostControls(props) {
  return (
    <div className='comment-content'>
      {props.showComments === true && (
        <div className='comment-content'>
          <div className='post-comment'>5</div>
          <div className='post-comment-icons'>
            <img alt='temp' className='control-image' width='20px' title='Comments' src={require('../icons/comment.png')} />
          </div>
        </div>
      )}
         </div>
  )
}

PostControls.propTypes = {

}
export default PostControls