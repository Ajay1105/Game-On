import { UserButton } from '@clerk/nextjs'
import './index.css'
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="logo">
            <img src="./logo.png"/>
        </div>
        <div className="menu-container">
            <ul className='menu'>
            <li className='item'><a href="/">Events</a></li>
            <li className='item'><a href="/">About Us</a></li>
            <li className='item'><a href="/">Gallery</a></li>
            <li className='item'><a href="/">Contact Us</a></li>
            <li className='item'><UserButton /></li>
            </ul>
            <button className="button">Register for New Event</button>
        </div>
    </nav>
  )
}
export default Navbar