import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    fetch(`http://localhost:8088/users?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(users => {
        if (users.length === 1) {
          // giriş başarılı
          localStorage.setItem("zenithx_user", JSON.stringify(users[0]))
          navigate("/requests") // giriş sonrası yönlendirilecek sayfa
        } else {
          setError("Invalid email or password")
        }
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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

      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  )
}
