// src/App.jsx
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "./shared/NavBar.jsx"
import { MyRequests } from "./customer/MyRequests.jsx"
import { NewRequest } from "./customer/NewRequest.jsx"
import { RequestDetail } from "./customer/RequestDetail.jsx"
import { RangesCatalog } from "./customer/RangesCatalog.jsx"
import { SystemsCatalog } from "./customer/SystemsCatalog.jsx"
import { Profile } from "./customer/Profile.jsx"
import { Logout } from "./customer/Logout.jsx"
import { Login } from "./customer/Login.jsx"
import { Home } from "./customer/Home.jsx"

export const App = () => {
  return (
    <Routes>
      {/* Login route en üstte */}
      <Route path="/login" element={<Login />} />

      {/* Diğer tüm rotalar NavBar + Outlet içinde */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        {/* Requests */}
        <Route path="requests" element={<MyRequests />} />
        <Route path="requests/new" element={<NewRequest />} />
        <Route path="requests/:requestId" element={<RequestDetail />} />

        {/* Catalogs */}
        <Route path="ranges" element={<RangesCatalog />} />
        <Route path="systems" element={<SystemsCatalog />} />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Logout */}
        <Route path="logout" element={<Logout />} />

        {/*Home*/}
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
