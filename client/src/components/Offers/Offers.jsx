import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/3dmodels.png'
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
        <button>View Models</button>
      </div>
    </div>
  )
}

export default Offers
