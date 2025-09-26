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
      .then(res => res.json())
      .then(data => setRequest(data))

    fetch(`http://localhost:8088/request_systems?requestId=${requestId}&_expand=system`)
      .then(res => res.json())
      .then(data => setSystems(data))
  }, [requestId])

  const handleUpdate = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "submitted" })
    }).then(() => navigate("/requests"))
  }

  const handleDelete = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, {
      method: "DELETE"
    }).then(() => navigate("/requests"))
  }

  return (
    <div className="request-detail">
      {request && (
        <>
          <h1>Request Detail</h1>
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>User:</strong> {request.user?.name}</p>
          <p><strong>Range:</strong> {request.range?.name}</p>
          <p><strong>Date:</strong> {request.primary_date}</p>
          <p><strong>Status:</strong> {request.status}</p>

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
        </>
      )}
    </div>
  )
}
