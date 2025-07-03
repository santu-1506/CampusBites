const mongoose = require("mongoose");

const CanteenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isOpen: { type: Boolean, default: true },
});

module.exports = mongoose.model("Canteen", CanteenSchema);
