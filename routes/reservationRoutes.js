const express = require("express");
const {
  createReservation,
  getAllReservations,
  deleteReservation,
  createReservationSpace,
  getAllReservationSpaces,
} = require("../controllers/reservationController");
const upload = require("../utils/upload");

const router = express.Router();

// Reservation routes
router.post("/", createReservation);
router.get("/", getAllReservations);
router.delete("/:reservationId", deleteReservation);

// Reservation Space routes
// 🆕 Create a new reservation space with image upload
router.post("/reservation-spaces", upload.single("image"), createReservationSpace);// Admin
router.get("/reservation-spaces", getAllReservationSpaces); // Public

module.exports = router;
