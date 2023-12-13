import React from 'react'
import CartItems from '../Components/CartItems/CartItems'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

const Cart = () => {
  
  return (
    <>
    <Navbar/>
    <div>
      <CartItems/>
    </div>
    <Footer/>
    </>
  )
  
}

export default Cart
