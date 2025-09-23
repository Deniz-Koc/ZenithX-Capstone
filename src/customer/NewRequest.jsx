import { useState, useEffect } from "react"
import { getRanges } from "../services/rangesService.jsx"
import { getSystems } from "../services/systemsService.jsx"

export const NewRequest = () => {
  const [ranges, setRanges] = useState([])
  const [systems, setSystems] = useState([])
  const [date, setDate] = useState("")
  const [selectedRange, setSelectedRange] = useState("")
  const [selectedSystems, setSelectedSystems] = useState([])

  useEffect(() => {
    getRanges().then(setRanges)
  }, [])

  useEffect(() => {
    getSystems().then(setSystems)
  }, [])

  const handleSave = (e) => {
    e.preventDefault()

    // Yeni request objesi
    const newRequest = {
      userId: 1,   // şimdilik sabit
      rangeId: parseInt(selectedRange),
      primary_date: date,
      status: "draft"
    }

    // Önce requests tablosuna POST
    fetch("http://localhost:8088/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest)
    })
      .then(res => res.json())
      .then((createdRequest) => {
        // Sonra seçilen sistemleri request_systems tablosuna kaydet
        selectedSystems.forEach(sysId => {
          fetch("http://localhost:8088/request_systems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              request_id: createdRequest.id,
              system_id: sysId
            })
          })
        })

        alert("Request saved successfully!")
      })
  }

  return (
    <div>
      <h1>New Test Request</h1>

      <form onSubmit={handleSave}>
        {/* Range seçimi */}
        <div>
          <label>Test Range:</label>
          <select 
            value={selectedRange} 
            onChange={(e) => setSelectedRange(e.target.value)}
            required
          >
            <option value="">Select a Test Range</option>
            {ranges.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        {/* Tarih seçimi */}
        <div>
          <label>Primary Date:</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Sistem seçimi */}
        <div>
          <label>Test Systems:</label>
          {systems.map(s => (
            <div key={s.id}>
              <label>
                <input 
                  type="checkbox"
                  value={s.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSystems([...selectedSystems, parseInt(e.target.value)])
                    } else {
                      setSelectedSystems(selectedSystems.filter(id => id !== parseInt(e.target.value)))
                    }
                  }}
                />
                {s.name}
              </label>
            </div>
          ))}
        </div>

        {/* Save */}
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
