import React from 'react'
import './Navbar.css'
import logo from '../../assets/axis-logo.png'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/'>
        <img className='nav-logo' src={logo} alt="" />
      </Link>
      <h1>Admin Panel</h1>
    </div>
  )
}

export default Navbar
