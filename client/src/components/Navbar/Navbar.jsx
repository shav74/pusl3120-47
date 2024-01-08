import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/axis-logo.png";
import cart_icon from "../Assets/cart-logo.png";
import person_icon from "../Assets/person-icon.png";
import person_cut_icon from "../Assets/person-cut-icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>
      <ul className="nav-menu">
        {/* <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none', color: menu === "home" ? 'white' : "black" }} to="/">HOME</Link></li> */}
        <li onClick={() => { setMenu("3dmodels") }}><Link style={{ textDecoration: 'none', color: menu === "3dmodels" ? 'white' : "black" }} to="/3dmodels">3D MODELS</Link></li>
        <li onClick={() => { setMenu("3dprinters") }}><Link style={{ textDecoration: 'none', color: menu === "3dprinters" ? 'white' : "black" }} to="/3dprinters">3D PRINTERS</Link></li>
        <li onClick={() => { setMenu("printerparts") }}><Link style={{ textDecoration: 'none', color: menu === "printerparts" ? 'white' : "black" }} to="/printerparts">PRINTER PARTS</Link></li>
        <li onClick={() => { setMenu("clientchat") }}><Link style={{ textDecoration: 'none', color: menu === "clientchat" ? 'white' : "black" }} to="/clientchat">CLIENT CHAT</Link></li>
        <li onClick={() => { setMenu("contactus") }}><Link style={{ textDecoration: 'none', color: menu === "contactus" ? 'white' : "black" }} to="/contactus">CONTACT US</Link></li>
        <li onClick={() => { setMenu("aboutus") }}><Link style={{ textDecoration: 'none', color: menu === "aboutus" ? 'white' : "black" }} to="/aboutus">ABOUT US</Link></li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ?
          <ul><li onClick={() => { setMenu("myaccount") }}><Link style={{ textDecoration: 'none', color: 'white' }} to="/myaccount">MY ACCOUNT</Link></li></ul>
          : <></>
        }
        {localStorage.getItem('auth-token') ?
          <></>
          : <Link to="/login"><img className="cuticon" src={person_icon} alt="" /></Link>}

        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>

  );
};

export default Navbar;
