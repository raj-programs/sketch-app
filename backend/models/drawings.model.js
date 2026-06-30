import mongoose from "mongoose";

const drawingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        default: "Untitled_Drawing",
        trim: true
    },
    drawingData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    imageUrl: {
        type: String,
    },
    thumbnailUrl: {
        type: String,
    },
}, { 
    timestamps: true 
});

const drawings = mongoose.model("Drawing", drawingSchema);

export default drawings;