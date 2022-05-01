const express = require('express');
const { requireSignin, adminMiddleware } = require('../http/middlewares/authMiddleware');
const router = express.Router();
const orderController = require('../http/controllers/customer/orderController');


router.get("/all-orders", requireSignin, adminMiddleware, orderController().allOrders)
router.post("/update-status/:id/:status", requireSignin, adminMiddleware, orderController().updateOrder)

module.exports = router;