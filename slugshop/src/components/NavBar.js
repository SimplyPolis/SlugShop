import React, {useState} from 'react'
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-containter'>
                <Link to="/" className="navbar-logo">
                    SLUGSHOP
                </Link>
            </div>
        </nav>
    </>
  )
}

export default NavBar
