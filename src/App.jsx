import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./shared/NavBar"
import { MyRequests } from "./customer/MyRequests.jsx"
import { NewRequest } from "./customer/NewRequest"
import { Profile } from "./customer/Profile.jsx"


export const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/requests" element={<MyRequests />} />
        <Route path="/requests/new" element={<NewRequest />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}
