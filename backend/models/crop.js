const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Crop name is required"],
    trim: true,
    unique: true, // Ensures no duplicate crop names (optional)
  },
}, { timestamps: true });

module.exports = mongoose.model("Crop", cropSchema);
