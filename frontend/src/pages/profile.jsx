import { useEffect, useState } from "react"
import api from "../../services/baseapi.js"
import { handleError } from "../utils/responseHandler.js"

function Profile() {

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

    return(
        <>
        <div>
            <h2>{getUser.name}</h2>
            <p>{getUser.email}</p>
            <p>{getUser.userName}</p>
        </div>
        </>
    )
}

export default Profile