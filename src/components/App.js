import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import PostForm from './PostForm'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import PostDetails from './PostDetails'
import PostList from './PostList'
import Menu from './Menu'
import PageNotFound from './PageNotFound'

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
                <Switch>
                  <Route exact path='/' component={PostList} />
                  <Route exact path='/newPost/' component={PostForm} />
                  <Route exact path='/PageNotFound/' component={PageNotFound} />
                  <Route exact path='/:category' component={PostList} />
                  <Route exact path='/:category/:id' component={PostDetails} />
                  <Route exact path='/post/edit/:id' component={PostForm} />
                  <Route component={PageNotFound} />
                </Switch>
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
