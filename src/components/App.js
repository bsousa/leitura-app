import React from 'react'
import '../App.css'
import Categories from './Categories.js'
import PostList from './PostList.js'

function App() {
  return (
    <div className="App">
        <div className='app-title'>Lecture App</div>

      <div className='menu'>
          <div className='menu-content'>
              <div className='menu-button'>
                <button>New Post</button>
              </div>
              <div className='menu-categories'>
                <Categories />  
              </div>
              <div className='menu-sort'>
                <span className='menu-title'>Sort by: </span>
                <select className='appearance-select'>
                  <option>Score, low to high</option>
                  <option>Score, high to low</option>
                  <option>Date, old to new</option>
                  <option>Date, new to old</option>
                </select>                
              </div>              
          </div>
      </div>
      <PostList />
    </div>
  );
}

export default App
