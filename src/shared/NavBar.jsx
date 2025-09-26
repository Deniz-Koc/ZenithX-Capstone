// src/shared/NavBar.jsx
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/requests">My Requests</Link></li>
        <li><Link to="/ranges">Ranges</Link></li>
        <li><Link to="/systems">Systems</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  )
}
