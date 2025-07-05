const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
  image: { type: String, default: "/placeholder.svg" },
  canteen: { type: mongoose.Schema.Types.ObjectId, ref: "Canteen", required: true },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Item", ItemSchema);
