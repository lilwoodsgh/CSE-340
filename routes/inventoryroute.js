// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invcontroller")
const utilities = require("../utilities")
const baseController = require("../controllers/basecontroller") // ✅ THIS LINE


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));


// Wrap the controller function
router.get("/", utilities.handleErrors(baseController.buildHome))
router.get("/", utilities.handleErrors(invController.someFunction));
router.get("/error", utilities.handleErrors((req, res, next) => {
  throw new Error("🚨 This is a simulated server error!");
}));



module.exports = router;