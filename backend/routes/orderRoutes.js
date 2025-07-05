const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updatePaymentStatus,
  verifyPayment,
} = require("../controllers/orderController");

// In a real app, you'd protect these routes with authentication middleware
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrderById);
router.route("/:id/payment").put(updatePaymentStatus);
router.route("/:id/verify-payment").post(verifyPayment);

module.exports = router; 