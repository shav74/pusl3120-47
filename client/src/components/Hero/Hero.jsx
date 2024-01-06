import React from 'react'
import './Hero.css'
import hero_image from '../Assets/hero_image.png'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>Welcome to axis Sri Lanka</h2>
                <div>
                    <h1>#1</h1>
                    <p>3D Printers Store</p>
                    <p>& Collection</p>
                </div>
                <div>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/3dprinters'>
                        <button className="hero-latest-btn">Shop Printers</button>
                    </Link>
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero
