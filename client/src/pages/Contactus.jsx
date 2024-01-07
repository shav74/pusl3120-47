import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './CSS/Contactus.css'

const Contactus = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tze4wuw', 'template_874zicp', form.current, 'tQyk7SywUtkEwTkJT')
      .then((result) => {
        console.log(result.text);
        alert('Message sent!');
        window.location.reload();
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className='contactus'>

      <div className="contactus-container">
        <h1>Contact Us</h1>
        <div className="divider">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Your questions matter to us. Feel free to reach out, and we'll respond promptly. Thank you for choosing us!</p>
            <br />
            <ul className='list'>
              <li>axis.srilanka@gmail.com</li>
              <li>081223890</li>
              <li>071333789</li>
              <li>axis pvt. ltd.</li>
            </ul>
          </div>

          <div className="contactus-fields">
            <form ref={form} onSubmit={sendEmail}>
              <input name='form_name' type="text" placeholder='Your Name' required />
              <input name='form_email' type="email" placeholder='Email Adress' required />
              <input name='form_phone' type="text" placeholder='+94 7X XXX XXXX' required />
              <textarea name="message" placeholder='Enter message...' cols="30" rows="10" required></textarea>
              <button className='cntact-btn' type="submit" value="send">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactus
