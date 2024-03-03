'use client'
import { UserButton } from '@clerk/nextjs'
import './index.css'
import { useState } from 'react'
import Image from 'next/image'

const Navbar = () => {
  const [menuOpen,setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
        <div className="logo">
            <a href='/'>
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            </a>
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
            <li className='item'><a href="/contact">Contact Us</a></li>
            <li className='user-icon'><UserButton /></li>
            </ul>
            <button className={`button ${menuOpen ? 'button-open' : ''}`} onClick={()=>{
              window.location.href='/admin/login'
            }}>Admin Login</button>
        </div>
    </nav>
  )
}
export default Navbar