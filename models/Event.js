const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
