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
      
      {/* Başlık ve butonu aynı satıra alıyoruz */}
      <div className="requests-header">
        <h1>My Test Requests</h1>
        <Link to="/requests/new" className="new-request-link">
          New Test Request
        </Link>
      </div>

      {/* Kartlar */}
      <div className="requests-grid">
        {requests.length > 0 ? (
          requests.map(r => (
            <div key={r.id} className="request-card">
              <p><strong>ID:</strong> {r.id}</p>
              <p><strong>User:</strong> {r.user?.name}</p>
              <p><strong>Range:</strong> {r.range?.name}</p>
              <p><strong>Date:</strong> {r.primary_date}</p>
              <p><strong>Status:</strong> {r.status}</p>
              <Link to={`/requests/${r.id}`} className="view-btn">View</Link>
            </div>
          ))
        ) : (
          <p>No requests found.</p>
        )}
      </div>
    </div>
  )
}
