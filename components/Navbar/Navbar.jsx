'use client'
import { UserButton } from '@clerk/nextjs'
import './index.css'
import { useState } from 'react'

const Navbar = () => {
  const [menuOpen,setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
        <div className="logo">
            <img src="./logo.png"/>
        </div>

        <div className="hamburger" onClick={handleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="menu-container">
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
            <li className='item'><a href="/">Events</a></li>
            <li className='item'><a href="/">About Us</a></li>
            <li className='item'><a href="/">Gallery</a></li>
            <li className='item'><a href="/">Contact Us</a></li>
            <li className='user-icon'><UserButton /></li>
            </ul>
            <button className={`button ${menuOpen ? 'button-open' : ''}`}>Register for New Event</button>
        </div>
    </nav>
  )
}
export default Navbar