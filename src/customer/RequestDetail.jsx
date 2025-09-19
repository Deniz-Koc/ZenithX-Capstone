import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const RequestDetail = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8088/requests/${requestId}?_expand=user&_expand=range`)
      .then(res => res.json())
      .then(data => setRequest(data))
  }, [requestId])

  const handleDelete = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, { method: "DELETE" })
      .then(() => navigate("/requests"))
  }

  if (!request) return <p>Loading...</p>

  return (
    <div>
      <h1>View Request (Customer)</h1>

      <div>
        <label>Test Range:</label>
        <span> {request.range?.name}</span>
      </div>

      <div>
        <label>Primary Date:</label>
        <span> {request.primary_date}</span>
      </div>

      <div>
        <label>Status:</label>
        <span> {request.status}</span>
      </div>

      <div>
        <label>User:</label>
        <span> {request.user?.name}</span>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate(`/requests/${requestId}/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/requests")}>Back</button>
      </div>
    </div>
  )
}
