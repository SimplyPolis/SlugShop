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

const Shop = () => {
  const newCollectionsRef = useRef(null);

  const scrollToNewCollections = () => {
    newCollectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <Hero scrollToNewCollections={scrollToNewCollections}/>
      <div ref={newCollectionsRef}>
        <NewCollections/>
      </div>
      <Offers/>
      <Popular/>
    </div>
  )
}

export default Shop
