const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: "Canteen", required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["placed", "preparing", "ready", "completed", "cancelled"],
    default: "placed",
  },
  payment: {
    method: {
      type: String,
      enum: ["cod", "upi", "card"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending"
    },
    transactionId: {
      type: String,
      default: null
    },
    // For UPI payments
    upiDetails: {
      upiId: String,
      paymentApp: String, // gpay, phonepe, paytm, etc.
    },
    // For card payments
    cardDetails: {
      lastFourDigits: String,
      cardType: String, // visa, mastercard, etc.
      holderName: String
    },
    // Payment completion timestamp
    paidAt: {
      type: Date,
      default: null
    }
  },
  placedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
