import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/3dmodels.png'
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
      <div className="offers-left">
        <h1>Checkout</h1>
        <h1>Pre-made Models</h1>
        <p>WE PRINT . WE DELIVER</p>
        <Link style={{ textDecoration: 'none', color: 'white' }} to='/3dmodels'>
          <button>View Models</button>
        </Link>
      </div>
    </div>
  )
}

export default Offers
