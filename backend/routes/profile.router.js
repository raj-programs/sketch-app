import express from "express"
import authMiddleware from "../middleware/auth/auth.middleware.js";
import User from "../models/user.model.js";
import successResponse from "../utils/successResponse.js";

const profileRouter = express.Router();

profileRouter.get("/me", authMiddleware, async (req, res, next) => {
    const user = await User.findById(req.userId).select("-password");
    successResponse(
        res,
        200,
        "User Fetched Successfully!!",
        user
    )
})

export default profileRouter;