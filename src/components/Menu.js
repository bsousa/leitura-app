import React from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories'

function Menu(props) {
  return (
    <div>
      <div className='app-title'>Lecture App</div>
      <div className='menu'>
        <div className='menu-content'>
          <div className='menu-button'>
            <Link className='category-menu' to='/'>Home</Link>
            <Link className='category-menu' to='/newPost'>New Post</Link>
          </div>
          <div className='menu-categories'>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Menu