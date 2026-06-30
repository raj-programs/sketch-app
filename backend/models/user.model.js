import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    userName: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true
    }
}, 
{
    timestamps: true,
}
)

const user = mongoose.model("User", userSchema);

export default user;