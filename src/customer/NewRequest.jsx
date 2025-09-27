import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"
import { getSystems } from "../services/systemsService.jsx"
import "./NewRequest.css"

export const NewRequest = () => {
  const [ranges, setRanges] = useState([])
  const [systems, setSystems] = useState([])
  const [date, setDate] = useState("")
  const [rangeId, setRangeId] = useState("")
  const [selectedSystems, setSelectedSystems] = useState([])
  const [error, setError] = useState("")

  const localUser = JSON.parse(localStorage.getItem("zenithx_user"))

  useEffect(() => {
    getRanges()
      .then(setRanges)
      .catch(() => setError("Failed to load test ranges."))
  }, [])

  useEffect(() => {
    getSystems()
      .then(setSystems)
      .catch(() => setError("Failed to load test systems."))
  }, [])

  const handleSystemChange = (e) => {
    const value = parseInt(e.target.value)
    if (e.target.checked) {
      setSelectedSystems([...selectedSystems, value])
    } else {
      setSelectedSystems(selectedSystems.filter(id => id !== value))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()

    if (!localUser) {
      setError("You must be logged in.")
      return
    }
    if (!rangeId) {
      setError("Please select a test range.")
      return
    }
    if (!date) {
      setError("Please choose a primary date.")
      return
    }
    if (selectedSystems.length === 0) {
      setError("Please select at least one system.")
      return
    }

    setError("") // temizle

    const newRequest = {
      userId: parseInt(localUser.id),
      rangeId: parseInt(rangeId),
      primary_date: date,
      status: "draft"
    }

    fetch("http://localhost:8088/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create request")
        return res.json()
      })
      .then(created => {
        selectedSystems.forEach(sysId => {
          fetch("http://localhost:8088/request_systems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requestId: created.id,
              systemId: sysId
            })
          })
        })
        alert("New request created successfully!")
      })
      .catch(() => setError("Error saving request. Please try again."))
  }

  return (
    <div className="new-request-page">
      <div className="new-request-container">
        <h1>New Test Request (Customer)</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSave} className="new-request-form">
          <div className="form-row">
            <label>Test Range:</label>
            <select value={rangeId} onChange={(e) => setRangeId(e.target.value)}>
              <option value="">Select a Test Range</option>
              {ranges.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Primary Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="systems-section">
            <label>Test Systems:</label>
            <div className="systems-options">
              {systems.map(s => (
                <label key={s.id}>
                  <input
                    type="checkbox"
                    value={s.id}
                    onChange={handleSystemChange}
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
