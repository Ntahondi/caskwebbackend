const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startDate: { type: Date, required: true },
  expireDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  }
}, { timestamps: true });

module.exports = mongoose.model("Ad", adSchema);
