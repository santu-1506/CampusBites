const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
} = require("../controllers/orderController");

// In a real app, you'd protect these routes with authentication middleware
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrderById);

module.exports = router; 