import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./RequestDetail.css"

export const RequestDetail = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)
  const [systems, setSystems] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8088/requests/${requestId}?_expand=user&_expand=range`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load request")
        return res.json()
      })
      .then(data => setRequest(data))
      .catch(() => alert("Error loading request details"))

    fetch(`http://localhost:8088/request_systems?requestId=${requestId}&_expand=system`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load systems")
        return res.json()
      })
      .then(data => setSystems(data))
      .catch(() => alert("Error loading systems"))
  }, [requestId])

  const handleUpdate = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "submitted" })
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed")
        navigate("/requests")
      })
      .catch(() => alert("Error updating request"))
  }

  const handleDelete = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed")
        navigate("/requests")
      })
      .catch(() => alert("Error deleting request"))
  }

  return (
    <div className="request-detail">
      {request ? (
        <div className="request-card">
          <h1>Request Detail</h1>
          <p><span>ID:</span> {request.id}</p>
          <p><span>User:</span> {request.user?.name}</p>
          <p><span>Range:</span> {request.range?.name}</p>
          <p><span>Date:</span> {request.primary_date}</p>
          <p><span>Status:</span> {request.status}</p>

          <h3>Test Systems</h3>
          <ul>
            {systems.length > 0 ? (
              systems.map(s => <li key={s.id}>{s.system?.name}</li>)
            ) : (
              <li>No systems selected</li>
            )}
          </ul>

          <div className="request-actions">
            <button onClick={handleUpdate}>Mark as Submitted</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate("/requests")}>Back</button>
          </div>
        </div>
      ) : (
        <p>Loading request details...</p>
      )}
    </div>
  )
}
