const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: "Canteen", required: true },
  amount: { type: Number, required: true },
  mode: { type: String, enum: ["cod", "online"], default: "cod" },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
