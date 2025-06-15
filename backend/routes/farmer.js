const express = require("express");
const router = express.Router();

const { registerFarmer, loginFarmer, getFarmers, acceptOrder, getFarmerById, completeOrder, pingBackend } = require("../controllers/farmer");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated");

//  Register & Login roues (Public)

router.post("/farmer/register", registerFarmer);
router.get("/farmers" , getFarmers)
router.post("/farmer/login", loginFarmer);
router.get("/farmer/:id" , getFarmerById)
//  Update order (Protected)
router.patch("/orders/:id", isAuthenticatedUser, acceptOrder); 
router.put("/accept-order/:farmerId/:companyId/:uniqueKey", completeOrder);

// just to ping the backend
router.get("/ping", pingBackend)

module.exports = router;
