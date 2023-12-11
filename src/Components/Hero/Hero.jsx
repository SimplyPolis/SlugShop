/*import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/stack.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>EXPLORE SLUGSHOP DEALS</h2>
        <div>
            <p>UCSC's</p>
            <p>Premium</p>
            <p>Online Market Place</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Listings</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero
*/

import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/sammy1.png'

const Hero = ({ scrollToNewCollections }) => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>EXPLORE SLUGSHOP DEALS</h2>
        <div>
            <p>UCSC's</p>
            <p>Premium</p>
            <p>Online Market Place</p>
        </div>
        <div className="hero-latest-btn" onClick={scrollToNewCollections}>
            <div>Latest Listings</div>
            <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  )
}

export default Hero
