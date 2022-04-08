import React from 'react'
import { ChangingTextBlinker } from 'react-changing-text-blinker'
import Footer from './components/Footer'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {

  const words = ["Accessible", "Visible", "Efficient"]
  const delayTime = 3;

  return (
    <div className='home'>
      
      <div className = "hero">
        <img className = 'landing_image' alt = 'landing'/>
        {/* changes last word every 3 seconds */}
        <h1>Making Donation Centers More  <ChangingTextBlinker className="text" stringArray={words} delayTime={delayTime} /></h1>
      </div>

      <div className = "mid">
        

        <div id = "desc" className="card border-primary mb-3">
          <div className="card-body text-primary">
            <h4 className="card-title home-title">Donamus’s Goal</h4>
            <p className="card-text">Donamus is the Latin word used for “We Give.” Our goal is to make donations more widespread and accessible by centralizing donation 
            requests into one, easy-to-read website. Whether it would be a food bank, homeless shelter, or soup kitchen, donations are important to help 
            lower income families and individuals. Donamus helps users identify where their extra supplies can go in order to help better their community. 
            Users will be able to view the listings that administrators of organizations make.</p>
          </div>
        </div>

        <br></br>
        <br></br>
    

        <div className="row ml-3">
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Request Listings</h5>
                <p className="card-text">The Request Listings page helps to organize the donation requests from locations. 
            Users can search materials needed by different sites and gather information about 
            the location including the address of the location, contact information, and quantity 
            of the requested items.</p>
                <Link to="/banks" className="btn btn-primary home-button">Go to Request Listings</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Map</h5>
                <p className="card-text">The Map page helps users to identify locations near them that have listings on the website. These points will be listed on the map.</p>
                <Link to="/map" className="btn btn-primary home-button">Go to Map</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Login and Account</h5>
                  <p className="card-text">
                    The Login and Account page is where administrators of certain organizations can post their donation requests on the webpage. A user does not need to sign up for an account to view locations.
                  </p>
                <Link to="/login" className="btn btn-primary home-button">Go to Login and Account</Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      
      
      <div>
        <Footer />
      </div>
      
    </div>
  )
}

export default Home