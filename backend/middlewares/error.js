const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.error("Error: ", err);
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = new ErrorHandler(err.message, err.statusCode);

    // ❌ Invalid Mongoose Object ID
    if (err.name === "CastError") {
      error = new ErrorHandler(`Resource not found. Invalid ${err.path}`, 400);
    }

    // ❌ Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message).join(", ");
      error = new ErrorHandler(message, 400);
    }

    // ❌ Duplicate Key Error (MongoDB unique fields)
    if (err.code === 11000) {
      error = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} entered.`, 400);
    }

    // ❌ JWT Errors (Invalid or Expired Tokens)
    if (err.name === "JsonWebTokenError") {
      error = new ErrorHandler("Invalid token. Please log in again!", 401);
    }

    if (err.name === "TokenExpiredError") {
      error = new ErrorHandler("Your session has expired. Please log in again!", 401);
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  next();
};
