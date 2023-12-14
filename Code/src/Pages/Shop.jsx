/*import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <NewCollections/>
      <Offers/>
      <Popular/>
    </div>
  )
}

export default Shop
*/

import React, { useRef } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

const Shop = () => {
  const newCollectionsRef = useRef(null);

  const scrollToNewCollections = () => {
    newCollectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
    <Navbar/>
    <div>
      <Hero scrollToNewCollections={scrollToNewCollections}/>
      <div ref={newCollectionsRef}>
        <NewCollections/>
      </div>
      <Offers/>
      <Popular/>
    </div>
    <Footer/>
    </>
  )
}

export default Shop
