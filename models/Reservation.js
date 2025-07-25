const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  requests: { type: String },
  space: { type: mongoose.Schema.Types.ObjectId, ref: "ReservationSpace", required: true }, // Reference to ReservationSpace
});

module.exports = mongoose.model("Reservation", reservationSchema);