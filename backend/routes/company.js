const express = require("express");
const router = express.Router();

const { registerCompany, loginCompany, getCompanies, getCompanyById, placeOrder } = require("../controllers/company");

const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");
const { createOrder  } = require("../controllers/order");

// ✅ Register & Login (Public)
router.post("/company/register", registerCompany);
router.post("/company/login", loginCompany);

// ✅ Get all companies (Public)
router.get("/companies", getCompanies);

// ✅ Get a specific company by ID (Protected)
// router.get("/company/:id", isAuthenticatedUser, getCompanyById);
router.get("/company/:id", getCompanyById);

// ✅ Place an order (Protected)
router.post("/company/order", isAuthenticatedUser, placeOrder);
router.post("/orders", createOrder)

module.exports = router;
