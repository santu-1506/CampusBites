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

    const { canteen, items, total, payment } = req.body;
    
    // Validate payment information
    if (!payment || !payment.method) {
      return res.status(400).json({ 
        success: false, 
        message: "Payment information is required" 
      });
    }

    // Validate payment method
    const validPaymentMethods = ["cod", "upi", "card"];
    if (!validPaymentMethods.includes(payment.method)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid payment method" 
      });
    }

    // Validate UPI details if payment method is UPI
    if (payment.method === "upi") {
      if (!payment.upiDetails || !payment.upiDetails.upiId) {
        return res.status(400).json({ 
          success: false, 
          message: "UPI ID is required for UPI payments" 
        });
      }
    }

    // Validate card details if payment method is card
    if (payment.method === "card") {
      if (!payment.cardDetails || !payment.cardDetails.lastFourDigits) {
        return res.status(400).json({ 
          success: false, 
          message: "Card details are required for card payments" 
        });
      }
    }

    // Create the order with payment information
    const order = await Order.create({
      student: student._id,
      canteen,
      items,
      total,
      payment: {
        method: payment.method,
        status: payment.status || "pending",
        transactionId: payment.transactionId || null,
        upiDetails: payment.upiDetails || null,
        cardDetails: payment.cardDetails || null,
        paidAt: payment.paidAt || null
      }
    });
    
    // Populate the created order with item details
    const populatedOrder = await Order.findById(order._id)
      .populate("canteen", "name")
      .populate("items.item", "name price image");
    
    res.status(201).json({
      success: true,
      data: populatedOrder,
      message: `Order placed successfully with ${payment.method.toUpperCase()} payment`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/v1/orders/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    
    const validStatuses = ["pending", "completed", "failed", "refunded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid payment status" 
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update payment status
    order.payment.status = status;
    if (transactionId) {
      order.payment.transactionId = transactionId;
    }
    if (status === "completed") {
      order.payment.paidAt = new Date();
    }
    order.updatedAt = new Date();
    
    await order.save();
    
    res.status(200).json({
      success: true,
      data: order,
      message: `Payment status updated to ${status}`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// @desc    Verify payment
// @route   POST /api/v1/orders/:id/verify-payment
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentMethod, transactionId } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Simulate payment verification based on method
    let verificationResult = { success: false, message: "" };
    
    if (paymentMethod === "upi") {
      // Simulate UPI verification
      if (transactionId && transactionId.startsWith("TXN")) {
        verificationResult = { success: true, message: "UPI payment verified successfully" };
      } else {
        verificationResult = { success: false, message: "Invalid UPI transaction ID" };
      }
    } else if (paymentMethod === "card") {
      // Simulate card verification
      if (transactionId && transactionId.startsWith("TXN")) {
        verificationResult = { success: true, message: "Card payment verified successfully" };
      } else {
        verificationResult = { success: false, message: "Invalid card transaction ID" };
      }
    } else if (paymentMethod === "cod") {
      verificationResult = { success: true, message: "COD payment verification not required" };
    }

    // Update order based on verification result
    if (verificationResult.success && paymentMethod !== "cod") {
      order.payment.status = "completed";
      order.payment.paidAt = new Date();
      await order.save();
    }
    
    res.status(200).json({
      success: verificationResult.success,
      message: verificationResult.message,
      data: order
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
}; 