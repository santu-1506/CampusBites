const mongoose = require("mongoose");

const CampusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  city: { type: String }
});

module.exports = mongoose.model("Campus", CampusSchema);