import React from "react";
import "./CSS/Checkout.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Checkout = () => {
  const { cartItems, addItems } = useContext(ShopContext);
  const item_id = [];
  for (let index = 0; index < 300 + 1; index++) {
    if (cartItems[index] > 0) {
      item_id.push(index);
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>CHECKOUT</h1>
        <form>
          <div className="checkout-field">
            <p>First Name</p>
            <input type="text" name="u.name" placeholder="ex: Senarath" />
          </div>
          <div className="checkout-field">
            <p>Last Name</p>
            <input type="text" name="u.name" placeholder="ex: Dunusinghe" />
          </div>
          <div className="checkout-field">
            <p>Adress Line 1</p>
            <input
              type="text"
              name="u.name"
              placeholder="ex: 170/E Wariyapola"
            />
          </div>
          <div className="checkout-field">
            <p className="optional-field">Address Line 2 (Optional)</p>
            <input
              type="text"
              name="u.name"
              placeholder="ex: 178/C Warakapola"
            />
          </div>
          <div className="checkout-field">
            <p>Postal Code</p>
            <input type="text" name="u.name" placeholder="ex: 20000" />
          </div>
          <div className="checkout-field">
            <p>Province</p>
            <input type="text" name="u.name" placeholder="ex: Central" />
          </div>
          <div className="checkout-field">
            <p>Payment Method</p>
            <select name="payment" className="payment-method">
              <option value="visa">CASH ON DELIVERY</option>
            </select>
          </div>
          <Link to="/">
            <button
              className="checkout-btn"
              type="submit"
              value="send"
              onClick={() => {
                for (let i = 0; i < item_id.length; i++) {
                  addItems(item_id[i]);
                }
              }}
            >
              PLACE ORDER
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
