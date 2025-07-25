const Reservation = require("../models/Reservation");
const ReservationSpace = require("../models/ReservationSpace"); // NEW
const upload = require("../utils/upload");

// Create a reservation
const createReservation = async (req, res) => {
  const { name, guests, date, time, requests, spaceId } = req.body;

  try {
    // Check if the selected space exists
    const space = await ReservationSpace.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Reservation space not found" });
    }

    // Create the reservation
    const reservation = new Reservation({ name, guests, date, time, requests, space: spaceId });
    await reservation.save();
    res.status(201).json({ message: "Reservation created successfully!", reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("space"); // Populate the space details
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🆕 Create a new reservation space with image upload
const createReservationSpace = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.path : null; // Get the uploaded file path

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const newSpace = new ReservationSpace({ name, description, image });
    await newSpace.save();
    res.status(201).json({ message: "Reservation space created successfully!", space: newSpace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🆕 Get all reservation spaces (user view)
const getAllReservationSpaces = async (req, res) => {
  try {
    const spaces = await ReservationSpace.find();
    res.status(200).json(spaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  deleteReservation,
  createReservationSpace,
  getAllReservationSpaces,
};
