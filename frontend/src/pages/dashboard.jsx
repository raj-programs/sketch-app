import { useEffect, useState } from "react"
import api from "../../services/baseapi"

function Dashboard() {
    const [getData, setGetdata] = useState([])

    useEffect(() => {
        const fetchDrawings = async() => {
            try {
                const token = localStorage.getItem("token")
                const drawings = await api.get("/api/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setGetdata(drawings)

            } catch (error) {
                console.log(error)
            }
        }
        
            fetchDrawings()
    })
    return (
        <>
        <div>
            <h1>{getData.name}</h1>
            <p>{getData.createdAt}</p>
            <img src={getData.drawing} alt="Drawing" />
        </div>
        </>
    )
}

export default Dashboard