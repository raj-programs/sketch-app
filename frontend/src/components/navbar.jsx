import { Link } from "react-router-dom"
import { Sun, Moon} from "lucide-react"
import "../styles/navbar.css"
import * as Dialog from "@radix-ui/react-dialog"
import Profile from "../pages/profile.jsx"
import logo from "../assets/logo.png"
function Navbar({ toggleTheme, darkMode }) {
    return (
        <>
        <nav className="navbar"> 
    <div className="nav-left">
        <Link to="/">
            <img src={logo} alt="sketch2shape" className="logo"/>
        </Link>
        
        <div className="nav-links">
            <Link to="/">My Canvas</Link>
            <Link to="/dashboard">My Sketches</Link>
        </div>

    </div>

    <div className="nav-right">

        <button
            onClick={toggleTheme}
            className="theme-toggle"
        >
            <Sun className={`sun ${darkMode ? "hidden" : ""}`} />
            <Moon className={`moon ${darkMode ? "" : "hidden"}`} />
        </button>
        <Profile />

    </div>

</nav>
        </>
    )
}

export default Navbar