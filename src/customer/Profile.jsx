// src/customer/Profile.jsx
import { useEffect, useState } from "react"

export const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Şimdilik 1 numaralı kullanıcıyı (Ava Carter) çekiyoruz
    fetch("http://localhost:8088/users/1")
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  if (!user) {
    return <p>Loading profile...</p>
  }

  return (
    <div>
      <h1>My Profile</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{user.company}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
