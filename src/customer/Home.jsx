import "./Home.css"
import ZenithLogoHome from "../assets/ZenithLogoHome.png"

export const Home = () => {
  return (
    <div className="home-container">
      <h1>WELCOME to ZENITHX TEST PORTAL</h1>
      <img src={ZenithLogoHome} alt="ZenithX Logo" className="home-logo" />
     <strong><p>Select an option from the navigation bar to get started.</p></strong>
    </div>
  )
}
