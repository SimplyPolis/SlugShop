/*import React, { useContext, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems}= useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SLUGSHOP</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link style={{ textDecoration: 'none' }} to="womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none' }} to='/kids'>Furniture</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../Assets/logo.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({
    profile: '' // Placeholder for the profile image URL
  });

  useEffect(() => {
    fetch('/getcategories.json') // Adjust the path if necessary
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    fetch('/getuserinfo.json') // Adjust the path if necessary
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SLUGSHOP</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Home
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        {categories.map((category, i) => (
          <li key={i} onClick={() => setMenu(category.category)}>
            <Link style={{ textDecoration: 'none' }} to={`/listings?category=${category.category}`}>
              {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
            </Link>
            {menu === category.category ? <hr /> : <></>}
          </li>
        ))}
      </ul>
      <div className="nav-profile">
        <Link to='/profile'>
          <img 
            src={userData.profile} 
            alt="Profile" 
            className="nav-profile-picture" // Use a specific class for styling
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
