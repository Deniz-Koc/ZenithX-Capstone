import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/requests">Requests</Link></li>        
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}