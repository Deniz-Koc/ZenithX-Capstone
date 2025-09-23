import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./MyRequests.css"

export const MyRequests = () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetch("http://localhost:8088/requests?_expand=user&_expand=range")
      .then((res) => res.json())
      .then((data) => setRequests(data))
  }, [])

return (
  <div className="requests-page">
    <div className="requests-container">
      <h1>My Test Requests</h1>

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
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.user?.name || "Unknown User"}</td>
              <td>{r.range?.name || "Unknown Range"}</td>
              <td>{r.primary_date}</td>
              <td>{r.status}</td>
              <td>
                <Link to={`/requests/${r.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="new-request-btn">
        <Link to="/requests/new">
          <button>New Test Request</button>
        </Link>
      </div>
    </div>
  </div>
)
}
