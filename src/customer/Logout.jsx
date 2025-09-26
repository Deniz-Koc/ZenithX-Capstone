import { useNavigate } from "react-router-dom"
import "./Log.css"

export const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("zenithx_user")
    alert("You have been logged out")
    navigate("/login")
  }

  return (
    <div className="log-container">
      <h1>Logout</h1>
      <button onClick={handleLogout} className="log-btn">
        Confirm Logout
      </button>
    </div>
  )
}
