// src/customer/RangesCatalog.jsx
import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"

export const RangesCatalog = () => {
  const [ranges, setRanges] = useState([])

  useEffect(() => {
    getRanges().then((data) => setRanges(data))
  }, [])

  return (
    <div>
      <h1>Test Ranges Catalog</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Max Altitude (ft)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {ranges.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.location}</td>
              <td>{r.max_altitude}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
