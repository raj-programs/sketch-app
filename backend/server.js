import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db-connection.config.js"
import Signuprouter from "./routes/signup.router.js"
import loginRouter from "./routes/login.router.js"
import drawingRouter from "./routes/drawing.router.js"
import cloudinary from "./config/cloudinary.config.js"
import profileRouter from "./routes/profile.router.js"
import Dashboardrouter from "./routes/dashboard.router.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("Server Running....")
})

app.use("/api/auth", Signuprouter)
app.use("/api/auth", loginRouter)
app.use("/api", drawingRouter)
app.use("/api", profileRouter)
app.use("/api", Dashboardrouter)


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
})