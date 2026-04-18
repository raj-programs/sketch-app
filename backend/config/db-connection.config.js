import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try{
        mongoose.connect(process.env.DB_URI)
        console.log("MongoDB Connected");
    }
    catch(error){
        console.log("Unable To Connect to DB", error);
        process.exit(1);
    }
}

export default connectDB;