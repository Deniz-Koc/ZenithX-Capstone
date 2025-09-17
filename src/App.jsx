import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./shared/NavBar"
import { MyRequests } from "./customer/MyRequests.jsx"
import { NewRequest } from "./customer/NewRequest"
import { Profile } from "./customer/Profile.jsx"
import { SystemsCatalog } from "./customer/SystemsCatalog"
import { RangesCatalog } from "./customer/RangesCatalog"
import { Logout } from "./customer/Logout"


export const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/requests" element={<MyRequests />} />
        <Route path="/requests/new" element={<NewRequest />} />
        <Route path="/systems" element={<SystemsCatalog />} />
        <Route path="/ranges" element={<RangesCatalog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  )
}
