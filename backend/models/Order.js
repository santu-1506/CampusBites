const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: "Canteen", required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      quantity: { type: Number, default: 1 },
      nameAtPurchase: { type: String },
      priceAtPurchase: { type: Number },
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
    transactionId: { type: String },
    upiDetails: {
      upiId: { type: String },
      paymentApp: { type: String }
    },
    cardDetails: {
      lastFourDigits: { type: String },
      cardType: { type: String },
      holderName: { type: String }
    },
    paidAt: { type: Date }
  },
  isDeleted: { type: Boolean, default: false },
  pickupTime:{
    type:String,
    required:false
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
