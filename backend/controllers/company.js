const Company = require("../models/company");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// ✅ Register Company
exports.registerCompany = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, contactNo, companyName, email, gst, password, orders } = req.body;

  const user = await Company.create({
    firstName,
    lastName,
    contactNo,
    companyName,
    email,
    gst,
    password,
    orders,
  });

  sendToken(user, 201, res);
});

// ✅ Login Company
exports.loginCompany = catchAsyncError(async (req, res, next) => {
  const { email, password, contactNo } = req.body;

  if (!password) {
    return next(new ErrorHandler("Please enter a password", 400));
  }

  let user;
  if (email) {
    user = await Company.findOne({ email }).select("+password");
  } else if (contactNo) {
    user = await Company.findOne({ contactNo }).select("+password");
  } else {
    return next(new ErrorHandler("Please enter an email or contact number", 400));
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

// ✅ Get all Companies
exports.getCompanies = catchAsyncError(async (req, res, next) => {
  const companies = await Company.find();
  res.status(200).json({
    success: true,
    companies,
  });
});

// ✅ Get Company by ID
exports.getCompanyById = catchAsyncError(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return next(new ErrorHandler("Company not found", 404));
  }

  res.status(200).json({
    success: true,
    company,
  });
});

// ✅ Place an Order (Company orders from a Farmer)
exports.placeOrder = catchAsyncError(async (req, res, next) => {
  const { farmerId, crops, weight, amount } = req.body;

  const company = await Company.findById(req.user.id);
  if (!company) {
    return next(new ErrorHandler("Company not found", 404));
  }

  company.orders.push({
    to: farmerId,
    weight,
    crops,
    amount,
  });

  await company.save();

  res.status(200).json({
    success: true,
    message: "Order placed successfully",
  });
});
