import jwt from "jsonwebtoken";
import AppError from "../../utils/appError.js";

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return next(new AppError("Authentication token missing", 401));
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return next(new AppError("Session expired. Please log in again.", 401));
        }

        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid authentication token.", 401));
        }

        return next(new AppError("Authentication failed.", 401));
    }
};

export default authMiddleware;