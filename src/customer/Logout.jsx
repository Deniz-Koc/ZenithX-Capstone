import { useNavigate } from "react-router-dom"

export const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Şimdilik sadece iskelet
    console.log("User logged out")
    alert("You have been logged out")
    
    // İlerde burada localStorage temizleme yapılır
    // localStorage.removeItem("user")
    
    // Login sayfasına yönlendirme
    navigate("/login")
  }

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Confirm Logout</button>
    </div>
  )
}
