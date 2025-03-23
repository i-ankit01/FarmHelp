const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const orderSubSchema = new mongoose.Schema({
  companyName: String,
  farmerName : String,
  crop: String,
  quantity: Number,
  price: Number,
  companyId : String,
  farmerId : String,
  uniqueKey : Number,
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Completed"], default: "Pending" },
}, { _id: false });


const CompanySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "required field"],
    minlength: [3, "please enter a valid name"],
    maxlength: [20, "name too long"],
  },
  lastName: {
    type: String,
    required: [true, "required field"],
    minlength: [3, "please enter a valid name"],
    maxlength: [20, "name too long"],
  },
  companyName: {
    type: String,
    required: [true, "required field"],
  },
  contactNo: {
    type: String,
    required: [true, "required field"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  email: {
    type: String,
    required: [true, "required field"],
    unique: true,
    validate: [validator.isEmail, "invalid email id"],
  },
  gst: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  orders: [orderSubSchema],
});


// Encrypting password before saving
CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare user password
CompanySchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JSON Web Token (JWT)
CompanySchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME || "7d",
  });
};

module.exports = mongoose.model("Company", CompanySchema);
