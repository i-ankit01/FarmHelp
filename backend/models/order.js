const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  companyName : String,
  farmerName : String,
  crop: {
    type: String,
    required: [true, "Crop is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // ✅ References Company model
    required: [true, "Buyer (Company) is required"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer", // ✅ References Farmer model
    required: [true, "Seller (Farmer) is required"],
  },
  uniqueKey : Number,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending", // ✅ Default order status
  },
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt fields

module.exports = mongoose.model("Order", orderSchema);
