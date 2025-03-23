const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, "Invalid GST Number"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
  orders: [
    {
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
      },
      reqArea: {
        type: Number,
      },
      crops: [{
        type: String,
      }],
      amount: {
        type: Number,
      },
    },
  ],
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
