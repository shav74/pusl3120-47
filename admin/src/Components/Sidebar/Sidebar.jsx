import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <p>Add Products</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <p>All products</p>
            </div>
        </Link>
        <Link to={'/orders'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <p>Orders</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar
