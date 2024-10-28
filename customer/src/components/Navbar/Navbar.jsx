import React from 'react'
import './Navbar.css'
import { assets } from  '../../../../admin/assests/assests'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="logo" className='logo' />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search} alt="" className='search1' />
        <button>Sign-in</button>
      </div>
    </div>
  )
}

export default Navbar