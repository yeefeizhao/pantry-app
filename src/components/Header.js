import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import './Header.css'
import { useAuthState } from "react-firebase-hooks/auth";


function Header() {
  //gets the current user
  const [user] = useAuthState(auth);

  return (
    
    <div id='scanfcode' className='header'>
      <nav className="navbar fixed-top navbar-expand-lg px-4 pt-2">
        <div className="container-fluid">
          <Link id = 'title' className="navbar-brand mb-0 ml-3 h1 pt-2" to="/">Donamus</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active px-3 pt-3" aria-current="page" to="/banks">Request Listings</Link>
              </li>  
              <li className="nav-item">
                <Link className="nav-link active px-3 pt-3" aria-current="page" to="/map">Map</Link>
              </li>      
            </ul>

            <div className="form-inline px-3">  
              <Link id="logbut" className="btn my-2 my-sm-0 px-3" type="button" to={user ? '/account' : '/login'}>{user ? "Account" : "Login"}</Link>
            </div>
            

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header