import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import user from "../models/user.model.js";
import AppError from "../utils/appError.js";
import successResponse from "../utils/successResponse.js";

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    const existing = await user.findOne({
        email
    })

    if(!existing){
        throw new AppError("Invalid Email", 400)
        
    }

    const match = await bcrypt.compare(password, existing.password)

    if(!match){
        throw new AppError("Invalid Password", 400)
    }

    const token = jwt.sign(
        { userId: existing._id },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
    );

    return successResponse(
        res, 
        200,
        `Welcome Back ${existing.userName}!!`,
        { token }
    )
})

export default loginRouter;