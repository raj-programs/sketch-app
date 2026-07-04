import { Link } from "react-router-dom"
import { Sun, Moon} from "lucide-react"
import "../styles/navbar.css"
import * as Dialog from "@radix-ui/react-dialog"
import Profile from "../pages/profile.jsx"
function Navbar({ toggleTheme, darkMode }) {
    return (
        <>
        <nav className="navbar">

    <div className="nav-left">

        <Link className="logo" to="/">
            Sketch
        </Link>

        <div className="nav-links">
            <Link to="/">Canvas</Link>
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