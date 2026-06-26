class AppError extends Error {
    constructor(message, statusCode) {
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;