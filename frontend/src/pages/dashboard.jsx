import { useEffect, useState } from "react"
import api from "../../services/baseapi.js"

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
                setGetdata(drawings.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        
            fetchDrawings()
    }, [])
    return (
        <>
        {
            getData.map((drawing, index) => {
                return(
                <div key={index}>
                    <h1>{drawing.name}</h1>
            <p>{drawing.createdAt}</p>
            <img src={drawing.imageUrl} alt="Drawing" />
                </div>
                )
            }) 
        }
        </>
    )
}

export default Dashboard