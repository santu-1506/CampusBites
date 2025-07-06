const mongoose = require("mongoose");

const CanteenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus" }, // Made optional
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Made optional
  isOpen: { type: Boolean, default: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  images: [{ type: String }],
  isDeleted: { type: Boolean, default: false },
  // Additional fields for frontend compatibility
  cuisine: { type: String, default: "Mixed" },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  deliveryTime: { type: String, default: "20-30 min" },
  distance: { type: String, default: "On Campus" },
  featured: { type: Boolean, default: false },
  discount: { type: String, default: null },
  description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Canteen", CanteenSchema);