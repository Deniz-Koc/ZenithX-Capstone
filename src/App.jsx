import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./shared/NavBar"
import { MyRequests } from "./customer/MyRequests.jsx"
import { Profile } from "./customer/Profile.jsx"


export const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/requests" element={<MyRequests />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}
