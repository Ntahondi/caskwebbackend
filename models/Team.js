const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  images: [{ type: String }], // Array of image paths
});

module.exports = mongoose.model("Team", teamSchema);