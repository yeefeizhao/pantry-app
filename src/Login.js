import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './firebase';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {

      if (user) navigate("/account");
  });

  return (
      <div className='login'>
      
          <h2>Login</h2>
        
          <div className="mb-2 mt-2">
              <input className = "form-control" type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email Address'/>
          </div>

          <div className="mb-2">
            <input className= "form-control" type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
          </div> 

          <button onClick={() => signInWithEmailAndPassword(email, password)} id = "login_button" className="btn btn-outline-primary">Log In</button>
          


          <div>
              Don't have an account? <Link className = 'link' to="/register">Register</Link> now.
          </div>

          <div>
              <Link className = 'link' to="/reset">Forgot Password?</Link>
          </div>
      </div>
  )
}

export default Login