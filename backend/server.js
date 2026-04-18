import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db-connection.config.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("Server Running....")
})
connectDB().then(
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}))