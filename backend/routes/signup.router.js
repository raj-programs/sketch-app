import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import user from "../models/user.model.js";

const Signuprouter = express.Router();
//Signup
Signuprouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await user.findOne({
        email
    });

    if (existingUser) {
       return res.status(400).json({message: "The user already Exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
        name, 
        email, 
        password: hashedPassword
    })
    res.status(200).json({message: "Signup successful!!"})
})

export default Signuprouter;
 