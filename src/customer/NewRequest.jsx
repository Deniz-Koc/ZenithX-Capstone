import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"
import { getSystems } from "../services/systemsService.jsx"

export const NewRequest = () => {
  const [ranges, setRanges] = useState([])
  const [systems, setSystems] = useState([])
  const [date, setDate] = useState("")

  useEffect(() => {
    getRanges().then((data) => setRanges(data))
  }, [])

  useEffect(() => {
    getSystems().then((data) => setSystems(data))
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    alert(`Form saved with date: ${date}`)
  }

  const handleCancel = () => {
    alert("Form cancelled")
  }

  return (
    <div>
      <h1>New Test Request (Customer)</h1>

      <form onSubmit={handleSave}>
        {/* Test Range - Dropdown */}
        <div>
          <label>Test Range:</label>
          <select>
            <option value="">Select a Test Range</option>
            {ranges.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Primary Date */}
        <div>
          <label>Primary Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        {/* Test Systems - Checkbox */}
        <div>
          <label>Test Systems:</label>
          {systems.map(s => (
            <div key={s.id}>
              <label>
                <input 
                  type="checkbox" 
                  value={s.id} 
                />
                {s.name}
              </label>
            </div>
          ))}
        </div>

        {/* Save / Cancel */}
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
