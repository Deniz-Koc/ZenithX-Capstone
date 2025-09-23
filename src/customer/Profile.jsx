import { useEffect, useState } from "react"

export const Profile = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("zenithx_user"))
    if (localUser) {
      fetch(`http://localhost:8088/users/${localUser.id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setIsEditing(false)
        localStorage.setItem("zenithx_user", JSON.stringify(data))
      })
  }

  if (!user) return <p>Loading profile...</p>

  return (
    <div>
      <h1>My Profile</h1>
      
      {!isEditing ? (
        <div>
          <table border="1">
            <tbody>
              <tr><th>Name</th><td>{user.name}</td></tr>
              <tr><th>Email</th><td>{user.email}</td></tr>
              <tr><th>Company</th><td>{user.company}</td></tr>
              <tr><th>Role</th><td>{user.role}</td></tr>
            </tbody>
          </table>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={user.name} 
              onChange={(e) => setUser({ ...user, name: e.target.value })} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={user.email} 
              onChange={(e) => setUser({ ...user, email: e.target.value })} 
            />
          </div>
          <div>
            <label>Company:</label>
            <input 
              type="text" 
              value={user.company} 
              onChange={(e) => setUser({ ...user, company: e.target.value })} 
            />
          </div>
          <div>
            <label>Role:</label>
            <input 
              type="text" 
              value={user.role} 
              onChange={(e) => setUser({ ...user, role: e.target.value })} 
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  )
}
