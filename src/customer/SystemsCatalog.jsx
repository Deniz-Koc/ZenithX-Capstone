import { useState, useEffect } from "react"
import { getSystems } from "../services/systemsService.jsx"
import "../customer/Catalog.css"

export const SystemsCatalog = () => {
  const [systems, setSystems] = useState([])

  useEffect(() => {
    getSystems().then((data) => setSystems(data))
  }, [])

  return (
    <div className="catalog-container">
      <h1>Test Systems Catalog</h1>
      <div className="catalog-cards">
        {systems.map((s) => (
          <div key={s.id} className="catalog-card">
            <p><span>Code:</span> {s.code}</p>
            <p><span>Name:</span> {s.name}</p>
            <p><span>Type:</span> {s.type}</p>
            <p><span>Specifications:</span> {s.key_specs}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
