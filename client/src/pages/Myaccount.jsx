import React from 'react'
import './CSS/Myaccount.css'

const Myaccount = () => {
  return (
    <div className='myaccount'>
      <div>
        <input type="text" name='passwordold' placeholder='old password'/>
        <input type="text" name='passwordnew' placeholder='new password'/>
      </div>
    </div>
  )
}

export default Myaccount
