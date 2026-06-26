import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db-connection.config.js"
import Signuprouter from "./routes/signup.router.js"
import loginRouter from "./routes/login.router.js"
import drawingRouter from "./routes/drawing.router.js"
import cloudinary from "./config/cloudinary.config.js"

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
app.use("/api/save", drawingRouter)


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
})