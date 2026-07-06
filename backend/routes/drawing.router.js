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

drawingRouter.delete("/delete/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;

        const drawing = await drawings.findOne({
            _id: id,
            userId: req.userId,
        });

        if (!drawing) {
            throw new AppError("Drawing not found!", 404);
        }

        if (drawing.publicId) {
            await cloudinary.uploader.destroy(drawing.publicId);
        }

        await drawings.findByIdAndDelete(id);

        successResponse(res, 
            200, 
           "Drawing deleted successfully!");
    } catch (error) {
        next(error);
    }
});

export default drawingRouter;

