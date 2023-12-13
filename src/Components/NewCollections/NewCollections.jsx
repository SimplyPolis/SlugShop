/*import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
  return (
    <div className='new-collections'>
      <h1>NEW LISTINGS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
*/

import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('http://localhost:8000/listings') // Assuming getlistings_1.json is in the public folder
      .then(response => response.json())
      .then(data => {
        setCollections(data);
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error fetching the collections:', error);
      });
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW LISTINGS</h1>
      <hr />
      <div className="user-listings">
        {collections.map((item,i) => (
          <Item 
            key={i}  
            name={item.name} 
            price={item.price} // Assuming 'price' is the new price
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
