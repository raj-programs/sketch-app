import { useState } from "react";
import api from "../../services/baseapi";
import { handleError, handleSucess } from "../utils/responseHandler";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) =>  {
        e.preventDefault()
        try {
             const response = await api.post("/api/auth/login",
                 {
                    email, 
                    password
                }
            )

            const result = handleSucess(response)

            localStorage.setItem("token", response.data.data.token);

            toast.success(result.message)


        } catch (error) {
            const err = handleError(error)
            toast.error(err.message)
        }
    }
    return (
        <>
        <form action="" onSubmit={handleLogin}>
        <h4>
            Email
        </h4>
        <input type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email" 
        required/>

        <h4>
            Password
        </h4>
        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required/>

        <p className="section-text">
            Don't Have an Account? {" "}
            <Link to="/signup">SignUp</Link>
            now!! 
            </p>
        <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login;