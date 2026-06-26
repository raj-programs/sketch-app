import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import user from "../models/user.model.js";

dotenv.config();

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const existing = await user.findOne({
        email
    })

    if(!existing){
        return res.status(400).json({
            message: "Invalid Email"
        })
    }

    const match = await bcrypt.compare(password, existing.password)

    if(!match){
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        { userId: existing._id },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
    );

    res.json({
        token
    })
})

export default loginRouter;