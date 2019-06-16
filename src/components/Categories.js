import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Categories extends Component {
  render() {
    const { categories } = this.props
    return (
      <div>
        {Object.keys(categories).map((category) => (
           <span><Link to={`/posts/${categories[category].name}`} className='category-menu'>{categories[category].name}</Link></span>
          ))}
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Categories)