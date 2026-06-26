const errorHandler = (err, res, req, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!",
    });
};

export default errorHandler;