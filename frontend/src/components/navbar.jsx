import { Link } from "react-router-dom"
import { FaRegUser } from "react-icons/fa"

function Navbar() {
    return (
        <>
        <Link to="/">Canvas</Link>
        <Link to="/dashboard">My Sketches</Link>
        <Link to="/profile"><FaRegUser /></Link>
        </>
    )
}

export default Navbar