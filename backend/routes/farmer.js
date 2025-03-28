const express = require("express");
const router = express.Router();

const { registerFarmer, loginFarmer, getFarmers, acceptOrder, getFarmerById, completeOrder } = require("../controllers/farmer");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");

// ✅ Register & Login routes (Public)

router.post("/farmer/register", registerFarmer);
router.get("/farmers" , getFarmers)
router.post("/farmer/login", loginFarmer);
router.get("/farmer/:id" , getFarmerById)
// ✅ Update order (Protected)
router.patch("/orders/:id", isAuthenticatedUser, acceptOrder); 
router.put("/accept-order/:farmerId/:companyId/:uniqueKey", completeOrder);

module.exports = router;
