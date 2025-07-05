const Order = require("../models/Order");
const User = require("../models/User");

// @desc    Get all orders for a student
// @route   GET /api/v1/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    // This is a placeholder for getting the logged-in user
    // In a real app, you'd get this from your authentication middleware (e.g., req.user.id)
    const student = await User.findOne();
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const orders = await Order.find({ student: student._id })
      .populate("canteen", "name")
      .populate("items.item", "name price image")
      .sort({ placedAt: -1 });
      
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("canteen", "name")
      .populate("items.item", "name price image");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    // This is a placeholder for getting the logged-in user
    const student = await User.findOne();
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const { canteen, items, total } = req.body;
    
    const order = await Order.create({
      student: student._id,
      canteen,
      items,
      total,
    });
    
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}; 