import { useEffect, useState } from "react"
import "./Profile.css"

export const Profile = () => {
  const [user, setUser] = useState(null)
  const localUser = JSON.parse(localStorage.getItem("zenithx_user"))

  useEffect(() => {
    if (localUser) {
      fetch(`http://localhost:8088/users/${localUser.id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [localUser?.id])

  if (!user) {
    return <p>Loading profile...</p>
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <table>
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
      <button>Edit Profile</button>
    </div>
  )
}
