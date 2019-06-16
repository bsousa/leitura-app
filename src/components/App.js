import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import PostForm from './PostForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostDetails from './PostDetails'
import PostList from './PostList';
import Menu from './Menu';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Menu />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={PostList} />
                <Route path='/posts/:category' exact component={PostList} />
                <Route exact path='/post/:id' component={PostDetails} />
                <Route exact path='/post/edit/:id' component={PostForm} />
                <Route exact path='/newPost' component={PostForm} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: posts === null
  }
}
export default connect(mapStateToProps)(App)
