const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./backend/config/db"); // Import DB connection
const app = require("./backend/app");


const PORT = process.env.PORT || 3000;

// ✅ Connect to Database
connectDB();

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


