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
    <div className="profile-page">
      <h1 className="profile-header">My Profile</h1>
      
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <button 
        className="edit-btn" 
        onClick={() => alert("Profile editing coming soon!")}
      >
        Edit Profile
      </button>
    </div>
  )
}
