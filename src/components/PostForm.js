import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPost, handleUpdatePost } from '../actions/posts'
import { Redirect } from 'react-router-dom'

class PostForm extends Component {
  state = {
    author: '',
    title: '',
    text: '',
    category: 'none',
    toHome: false,
  }

  componentDidMount(){
    if (this.props.post !== undefined) {
      this.setState({
        author: this.props.post.author,
        title: this.props.post.title,
        text: this.props.post.body,
        category: this.props.post.category,
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      if (this.props.post !== undefined) {
        this.setState({
          author: this.props.post.author,
          title: this.props.post.title,
          text: this.props.post.body,
          category: this.props.post.category,
        })
      }
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    if (this.props.post !== undefined) {
      dispatch(handleUpdatePost({
        id: this.props.post.id, 
        title: this.state.title,
        body: this.state.text}))
    } else {
      dispatch(handleAddPost(this.state.author, this.state.title, this.state.text, this.state.category))
    }

    this.setState({
      author: '',
      title: '',
      text: '',
      category: 'none',
      toHome: true,
    })

  }

  checkFields() {
    return this.state.title === '' || this.state.text === '' || this.state.category === 'none' || this.state.author === ''
  }
  render() {
    const { categories } = this.props

    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div className='app-title'>
          Post
        </div>

        <form className='new-post' onSubmit={this.handleSubmit}>
          <input type='text' name='author' onChange={this.handleChange} disabled={this.props.post !== undefined} value={this.state.author} className='post-input' placeholder='Author' />
          <input type='text' name='title' onChange={this.handleChange} value={this.state.title} className='post-input' placeholder='Title' />
          <input type='text' name='text' onChange={this.handleChange} value={this.state.text} className='post-input' placeholder='Text' />
          <select className='post-input' onChange={this.handleChange} disabled={this.props.post !== undefined} name='category' value={this.state.category}>
            <option value='none' disabled>Category</option>
            {Object.keys(categories).map((category) => (
              <option value={categories[category].value}>{categories[category].name}</option>
            ))}
          </select>
          <input type='submit' disabled={this.checkFields()} value='Publish' className='post-button' />
        </form>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, dispatch }, props) {
  const { id } = props.match.params
  const post = posts[id]
  let refresh = false
  if (id !== undefined){
    refresh = true
  }
  return {
    refresh, 
    categories,
    post,
    dispatch
  }
}

export default connect(mapStateToProps)(PostForm)