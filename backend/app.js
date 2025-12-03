const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173", 
//   credentials: true,  
// }));
const allowedOrigins = [
  "http://localhost:5173",           
  "https://farm-help-eight.vercel.app",  
  "https://www.farm-help-eight.vercel.app",  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Importing all routes
const farmers = require("./routes/farmer");
const companies = require("./routes/company");
const geminiRoutes = require("./routes/gemini");
const voiceChatbotRoute = require("./routes/voicebot")

app.use("/api/v1", farmers);
app.use("/api/v1", companies);
app.use("/api/gemini", geminiRoutes);
app.use("/api", voiceChatbotRoute)

// Serve React app for all unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.use(errorMiddleware);

module.exports = app;

