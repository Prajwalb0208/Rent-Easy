import React from 'react'
import './Navbar.css'
import { assets } from '../../../assests/assests'


const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={assets.logo} alt="" className='logo' />
            <ul className="navbar-menu">
                <li>Home</li>
                <li>Mobile App</li>
                <li>Contact Us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.logo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Navbar