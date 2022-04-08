import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom'
import { auth, userRegistration } from './firebase'
import './Register.css'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) {
            return; 
        }
        if (user) navigate("/account");
    });

    return (
        <div className='register'>

            <h2>Register</h2>
            <div class="mb-2 mt-2">
                <input class = "form-control" type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
            </div>

            <div class="mb-2 mt-2">
                <input class = "form-control" type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email Address'/>
            </div>

            <div class="mb-2 mt-2">
                <input class = "form-control" type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            </div>

            <button onClick={() => userRegistration(name, email, password)} id = "login_button" class="btn btn-outline-primary">Sign Up</button>

            <div>
                Already have an account? <Link className = 'link' to="/login">Log In</Link> now.
            </div>
        </div>
    )
}

export default Register