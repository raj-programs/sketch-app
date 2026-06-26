import express from "express";
import bcrypt from "bcrypt";
import user from "../models/user.model.js";
import AppError from "../utils/appError.js";
import successResponse from "../utils/successResponse.js";

const Signuprouter = express.Router();

Signuprouter.post("/signup", async (req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;

    const existingEmail = await user.findOne({ email });

    if (existingEmail) {
      throw new AppError("This Email Already Exists!", 400)
    }

    const existingUser = await user.findOne({ userName });

    if (existingUser) {
      throw new AppError("This Username already exists Exists!", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    return successResponse(
        res,
        201, 
        `${userName} Created Sucessfully!!`,
    )

  } catch (error) {
    next(error);
  }
});

export default Signuprouter;