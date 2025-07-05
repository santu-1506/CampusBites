const mongoose = require("mongoose");

const CanteenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isOpen: { type: Boolean, default: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  images: [{ type: String }],
});

module.exports = mongoose.model("Canteen", CanteenSchema);