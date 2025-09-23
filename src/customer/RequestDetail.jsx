import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./RequestDetail.css"

export const RequestDetail = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8088/requests/${requestId}?_expand=user&_expand=range`)
      .then((res) => res.json())
      .then((data) => setRequest(data))
  }, [requestId])

  const handleDelete = () => {
    fetch(`http://localhost:8088/requests/${requestId}`, {
      method: "DELETE"
    }).then(() => {
      navigate("/requests")
    })
  }

  const handleEdit = () => {
    alert("Edit feature will be implemented soon!")
  }

  if (!request) {
    return <p>Loading...</p>
  }

  return (
    <div className="request-detail">
      <h1>Request Detail</h1>
      <p><strong>ID:</strong> {request.id}</p>
      <p><strong>User:</strong> {request.user?.name}</p>
      <p><strong>Range:</strong> {request.range?.name}</p>
      <p><strong>Date:</strong> {request.primary_date}</p>
      <p><strong>Status:</strong> {request.status}</p>

      <div className="request-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/requests")}>Back</button>
      </div>
    </div>
  )
}
