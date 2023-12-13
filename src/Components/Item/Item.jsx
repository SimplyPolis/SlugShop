import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <div>
      <img
          className=" w-[15rem] h-[15rem]"
          src="https://i.ebayimg.com/images/g/i8gAAOSwSatiDUg1/s-l1600.jpg" 
          alt="Placeholder"/>
      </div>
      <p>{props.name}</p>
      
      <div className="item-prices">
        <div className="item-price-new">
            ${props.price}
        </div>
      </div>
    </div>
  )
}

export default Item
