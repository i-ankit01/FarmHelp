const ErrorHandler = require("../utils/errorHandler");
const Farmer = require("../models/farmer"); // Change to Company if needed
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

// ✅ Middleware to check if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Farmer.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token.", 401));
  }
});
