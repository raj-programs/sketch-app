import express, { json } from "express"
import authMiddleware from "../middleware/auth/auth.middleware.js";
import cloudinary from "../config/cloudinary.config.js";
import drawings from "../models/drawings.model.js";

const drawingRouter = express.Router();

drawingRouter.post("/save",authMiddleware, async (req, res) => {
    const { shape, image } = req.body;
    let imageUrl = "";
    let publicID = "";

    if(image){
        const upload = await cloudinary.uploader.upload(image, {
            folder: `drawing${req.userId}`
        })
    }

    imageUrl = upload.secure_url;
    publicID = upload.public_id;

    const drawing = await drawings.create(
        req.userId,
        shape,
        imageUrl,
        publicID
    );

    res.json(json)
})

export default drawingRouter;

