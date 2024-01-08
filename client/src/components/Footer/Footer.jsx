import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/axis-logo.png'
import inst_icon from '../Assets/insta_icon.png'
import fb_icon from '../Assets/fb_icon.png'
import whats_icon from '../Assets/whatsapp_icon.png'
import git_icon from '../Assets/git_icon.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='footer-logo'>
          <img src={footer_logo} alt="" />
          <p>SRI LANKA</p>
        </div>
      </div>

      <div className='footerlink'>
        <ul className="footer-links">
          <Link to='/3dprinters' style={{ textDecoration: 'none', color: 'white' }}><li>3D Printers</li></Link>
          <Link to='/3dmodels' style={{ textDecoration: 'none', color: 'white' }}><li>3D Models</li></Link>
          <Link to='/printerparts' style={{ textDecoration: 'none', color: 'white' }}><li>Printer Parts</li></Link>
          <Link to='/aboutus' style={{ textDecoration: 'none', color: 'white' }}><li>About US</li></Link>
          <Link to='/contactus' style={{ textDecoration: 'none', color: 'white' }}><li>Contact US</li></Link>

          {localStorage.getItem('auth-token') ?
            <Link onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} style={{ textDecoration: 'none', color: 'white' }}><li>Sign Out</li></Link>
            : <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}><li>Sign In</li></Link>
          }
        </ul>
        <div className="footer-social-icon">
          <div className="footer-icons-container">
            <a href="https://github.com/shav74/pusl3120-47">
              <img src={git_icon} alt="" />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://www.instagram.com/">
              <img src={inst_icon} alt="" />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://web.facebook.com/">
              <img src={fb_icon} alt="" />
            </a>
          </div>
          <div className="footer-icons-container">
            <a href="https://www.whatsapp.com/">
              <img src={whats_icon} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>axis Sri Lanka | Copyright @ 2024 - All Rights Reserved</p>
      </div>
    </>
  )
}

export default Footer
