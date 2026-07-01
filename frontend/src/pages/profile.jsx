import { useEffect, useState } from "react"
import api from "../../services/baseapi.js"
import { handleError } from "../utils/responseHandler.js"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

function Profile() {
    const navigate = useNavigate()

    const [getUser, setGetuser] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/api/me", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setGetuser(response.data.data)

            } catch (error) {
                handleError(
                    error.message
                )
            }
        }
        fetchUser()
    }, [])

      if(!getUser) return <p>Loacding...</p> 

      const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
      }
    return(
        <>
        <div>
            <h2>{getUser.name}</h2>
            <p>{getUser.email}</p>
            <p>{getUser.userName}</p>
        </div>
        <button 
        className="logout" 
        onClick={handleLogout}
        >
            <CiLogout /> Logout
        </button>
        </>
    )
}

export default Profile