import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/systems">Systems</Link></li>
        <li><Link to="/ranges">Ranges</Link></li>       
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li> 
      </ul>
    </nav>
  )
}