import express, { json } from "express"
import authMiddleware from "../middleware/auth/auth.middleware.js";
import cloudinary from "../config/cloudinary.config.js";
import drawings from "../models/drawings.model.js";
import successResponse from "../utils/successResponse.js";
import AppError from "../utils/appError.js";

const drawingRouter = express.Router();

drawingRouter.post("/save",authMiddleware, async (req, res) => {
   try {
     const { drawingData, image, name } = req.body;
    let imageUrl = "";
    let publicID = "";
    let upload;

    if(image){
         upload = await cloudinary.uploader.upload(image, {
            folder: `drawings/${req.userId}`
        })
    }

    if(upload){
    imageUrl = upload.secure_url;
    publicID = upload.public_id;
    }

    const thumbnailUrl = cloudinary.url(upload.public_id, {
        width: 300,
        height: 200,
        crop: "fill",
        quality: "auto",
        fetch_format: "auto",
    })

    const drawing = await drawings.create({
        userId: req.userId,
        name,
        drawingData,
        imageUrl,
        thumbnailUrl
    }
    );

    return successResponse(
        res,
        201,
        "Drawing Saved Successfully!!",
        drawing
    )
    
   } catch (error) {
    console.log(error);
   }
})

export default drawingRouter;

