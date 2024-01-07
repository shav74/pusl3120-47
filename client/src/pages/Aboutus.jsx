import React from 'react'
import './CSS/Aboutus.css'
import about_image from '../components/Assets/aboutus-image.png'

const Aboutus = () => {
  return (
    <div className='aboutus'>
      <div className="aboutus-container">
        <h1>About Us</h1>



        <div className="divider">

          <div className="about-info">
            <h2>Who We Are?</h2>
            <p>Since its inception, Axis Sri Lanka has emerged as a leading provider of cutting-edge 3D printers, 3D models, printer parts, and related accessories. What began as a vision has now evolved into our dedicated passion, and we are thrilled to share our expertise with you. Over the years, we have garnered a reputation for excellence and have served numerous satisfied customers. Our commitment to the world of 3D printing drives us every day, and we take pride in expanding our product range to meet all your printing needs. At Axis Sri Lanka, we understand that exceptional service is built on a foundation of knowledgeable individuals with industry experience. Our team comprises skilled and dedicated professionals who are genuinely committed to ensuring that your experience with us is seamless, convenient, and fulfilling. We invite you to visit our store, connect with us, and explore the possibilities of 3D printing. If you have any inquiries, feel free to reach out to us at <span>axis.srilanka@gmail.com</span>. We look forward to being a part of your 3D printing journey.</p>

          </div>

          <div className="aboutus-fields">
            <img src={about_image} alt="about-us-image" />
          </div>

        </div>



      </div>
    </div>
  )
}

export default Aboutus
