const express = require("express");
const { getEvents, addEvent, updateEventStatus, deleteEvent } = require("../controllers/eventController");
const upload = require("../utils/upload"); // Import the upload utility

const router = express.Router();

// Get all events
router.get("/", getEvents);

// Add a new event with image upload
router.post("/", upload.single("image"), addEvent);// Use Multer middleware for file upload

// Update an event
router.patch("/:id/status", updateEventStatus);

// Delete an event
router.delete("/:id", deleteEvent);

module.exports = router;