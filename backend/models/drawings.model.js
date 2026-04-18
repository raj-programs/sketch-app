import mongoose from "mongoose";
import user from "./user.model";

const drawingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: String,
    shapes: Array,
    imageurl: String,
    thumnail: String
}, { timestamps: true });

const drawings = mongoose.model("Drawing", drawingSchema);

export default drawings;