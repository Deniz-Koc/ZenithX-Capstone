import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"
import "../customer/Catalog.css"

export const RangesCatalog = () => {
  const [ranges, setRanges] = useState([])

  useEffect(() => {
    getRanges().then((data) => setRanges(data))
  }, [])

  return (
    <div className="catalog-container">
      <h1>Test Ranges Catalog</h1>
      <div className="catalog-cards">
        {ranges.map((r) => (
          <div key={r.id} className="catalog-card">
            <p><span>Name:</span> {r.name}</p>
            <p><span>Location:</span> {r.location}</p>
            <p><span>Max Altitude:</span> {r.max_altitude} ft</p>
            <p><span>Description:</span> {r.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
