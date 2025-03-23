const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const orderSubSchema = new mongoose.Schema({
  companyName: String,
  farmerName : String,
  crop: String,
  quantity: Number,
  price: Number,
  companyId : String,
  farmerId : String,
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Completed"], default: "Pending" },
}, { _id: false });


const farmerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please fill your first name"],
    minlength: [3, "First name must be at least 3 characters"],
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "Please fill your last name"],
    minlength: 3,
    maxlength: 20,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value); // Ensures exactly 10-digit numbers
      },
      message: "Please enter a valid 10-digit contact number",
    },
  },
  email: {
    type: String,
    required: [true, "Please enter an email ID"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  aadhar: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{12}$/.test(value); // Ensures exactly 12-digit numbers
      },
      message: "Please enter a valid 12-digit Aadhar number",
    },
  },
  land: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
    select: false,
  },
  crops: {
    type: [String], // ✅ Array of crop names
    default: [],
  },
  orders: [orderSubSchema]
});


// ✅ Encrypt password before saving
farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare user password
farmerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Return JSON Web Token (JWT)
farmerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME || "7d",
  });
};

module.exports = mongoose.model("Farmer", farmerSchema);
