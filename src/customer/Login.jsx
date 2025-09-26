import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Log.css"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    fetch(`http://localhost:8088/users?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(users => {
        if (users.length === 1) {
          localStorage.setItem("zenithx_user", JSON.stringify(users[0]))
          navigate("/requests")
        }
      })
  }

  return (
    <div className="log-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="log-form">
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
