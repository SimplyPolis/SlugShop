/*import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {
  return (
    <div className='popular'>
      <h1>WOMEN'S CLOTHING</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
*/


import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/getlistings_1.json') // Assuming getlistings_1.json is in the public folder
      .then(response => response.json())
      .then(data => {
        setCollections(data);
      })
      .catch(error => {
        console.error('There was an error fetching the collections:', error);
      });
  }, []);

  return (
    <div className='popular'>
      <h1>WOMENS CLOTHING</h1>
      <hr />
      {/*<div className="popular-item"> */}
      <div className="user-listings">
        {collections.map((item, i) => (
          <Item 
            key={i} 
            id={item.listing_id} 
            name={item.listing_name} 
            image={item.images[0]} // Assuming you want to display the first image
            new_price={item.price} // Assuming 'price' is the new price
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;

