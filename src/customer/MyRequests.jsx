import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./MyRequests.css"

export const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const currentUser = JSON.parse(localStorage.getItem("zenithx_user"))

  useEffect(() => {
    if (!currentUser) return
    fetch(`http://localhost:8088/requests?userId=${currentUser.id}&_expand=user&_expand=range`)
      .then(res => res.json())
      .then(data => setRequests(data))
  }, [currentUser?.id])

  return (
    <div className="requests-page">
      <h1>My Test Requests</h1>

      <div className="new-request-btn">
        <Link to="/requests/new">New Test Request</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User</th>
            <th>Range</th>
            <th>Primary Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user?.name}</td>
                <td>{r.range?.name}</td>
                <td>{r.primary_date}</td>
                <td>{r.status}</td>
                <td>
                  <Link to={`/requests/${r.id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
