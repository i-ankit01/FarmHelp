
const Farmer = require("../models/farmer");
const Company = require("../models/company");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Order = require("../models/order")

// ✅ Create a new order and link it to both Farmer & Company
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {companyName, farmerName, farmerId, crop, price, demandWeight, companyId } = req.body;
  console.log(req.body)

  // 🔹 Validate required fields
  if (!companyName || !farmerName || !farmerId || !crop || !price || !demandWeight || !companyId) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // 🔹 Check if Farmer exists
  const farmer = await Farmer.findById(farmerId);
  if (!farmer) {
    return next(new ErrorHandler("Farmer not found", 404));
  }

  // 🔹 Check if Company exists
  const company = await Company.findById(companyId);
  if (!company) {
    return next(new ErrorHandler("Company not found", 404));
  }

  // 🔹 Create the order in the Order collection
  const newOrder = await Order.create({
    companyName : companyName,
    farmerName : farmerName,
    crop: crop,
    quantity: demandWeight,
    price : price,
    buyer: companyId,
    seller: farmerId,
    status: "Pending",
    uniqueKey: Number(`${Date.now()}${Math.floor(Math.random() * 100000)}`)
  });

  // 🔹 Push order ID to Farmer's orders array
  farmer.orders.push({
    companyName: newOrder.companyName,
    farmerName: newOrder.farmerName,
    farmerId : newOrder.seller,
    companyId : newOrder.buyer,
    crop: newOrder.crop,
    quantity: newOrder.quantity,
    price: newOrder.price,
    status: newOrder.status,
    uniqueKey: newOrder.uniqueKey // Ensure status field is explicitly included
  });
  await farmer.save();
  console.log("orders pushed in farmeres")

  // 🔹 Push order ID to Company's orders array
  try {
    company.orders.push({
        companyName: newOrder.companyName,
        farmerName: newOrder.farmerName,
        crop: newOrder.crop,
        farmerId : newOrder.seller,
        companyId : newOrder.buyer,
        quantity: newOrder.quantity,
        price: newOrder.price,
        status: newOrder.status,
        uniqueKey : newOrder.uniqueKey // Ensure status field is explicitly included
      });
    await company.save();
  } catch (error) {
    console.error("Error saving company order:", error);
  }
  
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order: newOrder,
  });
});


