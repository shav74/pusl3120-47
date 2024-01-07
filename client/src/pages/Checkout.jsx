import React from 'react'
import './CSS/Checkout.css'
import { Link } from 'react-router-dom'

const Checkout = () => {
    return (
        <div className='checkout'>
            <div className="checkout-container">
                <h1>CHECKOUT</h1>
                <div className="checkout-field">
                    <p>First Name</p>
                    <input type="text" name="u.name" placeholder='ex: Senarath' required />
                </div>
                <div className="checkout-field">
                    <p>Last Name</p>
                    <input type="text" name="u.name" placeholder='ex: Dunusinghe' required />
                </div>
                <div className="checkout-field">
                    <p>Adress Line 1</p>
                    <input type="text" name="u.name" placeholder='ex: 170/E Wariyapola' required />
                </div>
                <div className="checkout-field">
                    <p className="optional-field">Address Line 2 (Optional)</p>
                    <input type="text" name="u.name" placeholder='ex: 178/C Warakapola' />
                </div>
                <div className="checkout-field">
                    <p>Postal Code</p>
                    <input type="text" name="u.name" placeholder='ex: 20000' required />
                </div>
                <div className="checkout-field">
                    <p>Province</p>
                    <input type="text" name="u.name" placeholder='ex: Central' required />
                </div>
                <div className="checkout-field">
                    <p>Country</p>
                    <select name="country" className='country-select' required >
                        <option value="srilanka">Sri Lanka</option>
                        <option value="usa">USA</option>
                        <option value="australia">Australia</option>
                    </select>
                </div>
                <div className="checkout-field">
                    <p>Payment Method</p>
                    <select name="payment" className='payment-method' required >
                        <option value="visa">VISA</option>
                        <option value="master">MASTER</option>
                        <option value="paypal">PAYPAL</option>
                    </select>
                </div>
                <Link to='/'>
                    <button className='checkout-btn'>PLACE ORDER</button>
                </Link>
            </div>
        </div>
    )
}

export default Checkout
