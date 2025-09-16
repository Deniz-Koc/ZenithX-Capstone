import { Link } from "react-router-dom"

export const MyRequests = () => {
  return (
    <div>
      <h1>My Test Requests</h1>
      <button>
        <Link to="/requests/new">New Test Request</Link>
      </button>
    </div>
  )
}
