const Farmer = require("../models/farmer");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// ✅ Register Farmer
exports.registerFarmer = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, contactNo, email, aadhar, land, password, crops, orders } = req.body;

  const user = await Farmer.create({
    firstName,
    lastName,
    contactNo,
    email,
    aadhar,
    land,
    password,
    crops,
    orders,
  });

  sendToken(user, 201, res);
});

// ✅ Login Farmer
exports.loginFarmer = catchAsyncError(async (req, res, next) => {
  const { email, password, contactNo } = req.body;
  if (!password) {
    return next(new ErrorHandler("Please enter a password", 400));
  }

  let user;
  if (email) {
    user = await Farmer.findOne({ email }).select("+password");
  } else if (contactNo) {
    user = await Farmer.findOne({ contactNo }).select("+password");
  } else {
    return next(new ErrorHandler("Please enter an email ", 400));
  }

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }

  sendToken(user, 200, res);
});

// ✅ Get all farmers
exports.getFarmers = catchAsyncError(async (req, res, next) => {
  const farmers = await Farmer.find(); // Fetch all farmers from DB
    res.status(200).json({
        success: true,
        farmers,
    });
  })

// ✅ Get a single farmer by ID
exports.getFarmerById = catchAsyncError(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.id);
  if (!farmer) {
    return next(new ErrorHandler("Farmer not found", 404));
  }

  res.status(200).json({
    success: true,
    farmer,
  });
});

// ✅ Update farmer profile
exports.updateFarmerProfile = catchAsyncError(async (req, res, next) => {
  let farmer = await Farmer.findById(req.params.id);
  if (!farmer) {
    return next(new ErrorHandler("Farmer not found", 404));
  }

  farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    farmer,
  });
});

// ✅ Delete a farmer
// exports.deleteFarmer = catchAsyncError(async (req, res, next) => {
//   const farmer = await Farmer.findById(req.params.id);
//   if (!farmer) {
//     return next(new ErrorHandler("Farmer not found", 404));
//   }

//   await farmer.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: "Farmer deleted successfully",
//   });
// });

// ✅ Accept an order from a company
exports.acceptOrder = catchAsyncError(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.id);
  if (!farmer) {
    return next(new ErrorHandler("Farmer not found", 404));
  }

  const newOrder = req.body;
  farmer.orders.push(newOrder);
  await farmer.save();

  res.status(200).json({
    success: true,
    message: "Order accepted successfully",
  });
});
