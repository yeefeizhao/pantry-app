import React from 'react'
import { ChangingTextBlinker } from 'react-changing-text-blinker'
import Footer from './Footer'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {

  const words = ["Accessible", "Visible", "Efficient"]
  const delayTime = 3;

  return (
    <div className='home'>
      
      <div className = "hero">
        <img className = 'landing_image' alt = 'landing'/>
        <h1>Making Donation Centers More  <ChangingTextBlinker stringArray={words} delayTime={delayTime} />
</h1>
      </div>

      <div class = "mid">
        

      <div id = "desc" class="card border-primary mb-3">
        <div class="card-body text-primary">
          <h4 class="card-title">Donamus’s Goal</h4>
          <p class="card-text">Donamus is the Latin word used for “We Give.” Our goal is to make donations more widespread and accessible by centralizing donation 
          requests into one, easy-to-read website. Whether it be a food bank, homeless shelter, or soup kitchen, donations are important to help 
          lower-class income families and individuals. Donamus helps users identify where their extra supplies can go to help better their community. 
          Users will be able to view the listings that administrators of organizations make.</p>
        </div>
      </div>

      <br></br>
      <br></br>
  

      <div class="row ml-3">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Request Listings</h5>
              <p class="card-text">The Request Listings page helps to organize the donation requests from locations. 
          Users can search materials needed by different sites and gather information about 
          the location including the address of the location, contact information, and quantity 
          of the requested items.</p>
              <Link to="/banks" class="btn btn-primary">Go to Request Listings</Link>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Map</h5>
              <p class="card-text">The Map page helps users to identify locations near them that have listings on the website. These points will be listed on the map.</p>
              <Link to="/map" class="btn btn-primary">Go to Map</Link>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Login and Account</h5>
              <p class="card-text">WThe Login and Account page is where administrators of certain organizations can post their 
          donation requests on the webpage. A user does not need to sign up for an account.</p>
              <Link to="/login" class="btn btn-primary">Go to Login and Account</Link>
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

//function word(current) {
//  let words = ["accessible", "visible", "efficient"]
//  let word = words[(words.indexOf(current) + 1) % 3]
//  return word
//}

//setInterval(function () {document.getElementById("word").innerText = word(document.getElementById("word").innerText)}, 4000)

export default Home