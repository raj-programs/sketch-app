import jwt from "jsonwebtoken"
import AppError from "../../utils/appError.js";


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
    } catch(error) {
        throw new AppError("Invalid Token", 401)
    }
}

export default authMiddleware;