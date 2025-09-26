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
      <table className="catalog-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Specifications</th>
          </tr>
        </thead>
        <tbody>
          {systems.map((s) => (
            <tr key={s.id}>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.type}</td>
              <td>{s.key_specs}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
