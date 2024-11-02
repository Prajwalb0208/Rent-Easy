import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add} alt="" />
                <p>Add House</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.list} alt="" />
                <p>All Houses</p>
            </NavLink>
        </div>
    </div>
  )
}
