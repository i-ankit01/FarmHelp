// Custom Error Handler class
class ErrorHandler extends Error {
    constructor(message = "Something went wrong", statusCode = 500) {
        super(String(message)); // Ensure message is a string
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
