import { useState } from "react"
import api from "../../services/baseapi.js"
import toast from "react-hot-toast"
import { handleError, handleSucess } from "../utils/responseHandler.js"
import { Link, useNavigate } from "react-router-dom"

function SignUp() {
    const [name, setName] = useState("")
    const [userName, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSignin = async (e) => {
        e.preventDefault();

        try{

        const response = await api.post("/api/auth/signup", {
            name,
            userName,
            email,
            password,
        })

        const result = handleSucess(response)

        toast.success(result.data.message)

        setName("")
        setUsername("")
        setEmail("")
        setPassword("")

        navigate("/login")

    }

    catch (error) {
        const err = handleError(error)
        toast.error(
            err.message
        )
    }


    }
    return(
        <>
        <form action="" onSubmit={handleSignin}>
            <h4>
                Name
            </h4>
            <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name" 
            required/>

             <h4>
                Username
            </h4>
            <input type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username" 
            required/>

             <h4>
                Email
            </h4>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email" 
            required/>

             <h4>
                Password
            </h4>
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password" 
            required/>

             <p className="section-text">
            Already Have an Account? {" "}
            <Link to="/login">Login</Link>
            here!! 
            </p>

            <button type="submit">Sign In</button>
        </form>
        </>
    )
}

export default SignUp