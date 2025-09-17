import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"
import { getSystems } from "../services/systemsService.jsx"

export const NewRequest = () => {
  const [ranges, setRanges] = useState([])
  const [systems, setSystems] = useState([])

  useEffect(() => {
    getRanges().then((data) => setRanges(data))
  }, [])

  useEffect(() => {
    getSystems().then((data) => setSystems(data))
  }, [])

  return (
    <div>
      <h1>New Test Request (Customer)</h1>

      <form>
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

        <div>
          <label>Test Systems:</label>
          <select>
            <option value="">Select a Test System</option>
            {systems.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
