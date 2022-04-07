import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from './firebase'
import './Reset.css'

function Reset() {
  const [email, setEmail] = useState('');
  
  return (
    <div className='reset'>
     

     <h2>Account Recovery</h2>
      <div class="mb-2 mt-2">
        <input class = "form-control" type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
      </div>

      <button onClick={() => resetPassword(email)} id = "login_button" class="btn btn-outline-primary">Send Password Reset Email</button>

      <div>
          Don't have an account? <Link className = 'link' to="/register">Register</Link> now.
      </div>
    </div>
  )
}

export default Reset