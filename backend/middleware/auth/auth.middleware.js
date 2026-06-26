import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import AppError from "../../utils/appError";

dotenv.config()

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        throw new AppError("No Token", 400)
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch {
        throw new AppError("Invalid Token", 401)
    }
}

export default authMiddleware;