import express from "express"
import { Router } from "express";
import authMiddleware from "../middleware/auth/auth.middleware.js";
import Drawing from "../models/drawings.model.js";
import successResponse from "../utils/successResponse.js";
import AppError from "../utils/appError.js";

const Dashboardrouter = express.Router()

Dashboardrouter.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const data = await Drawing.find({ userId: req.userId }).select("name imageUrl createdAt");
        successResponse(
            res, 
            200,
            "Fetched Drawings Successfully!!",
            data
        )

    } catch (error) {        
        throw new AppError("Failed to Fetch.", 500)
    }
})

export default Dashboardrouter;