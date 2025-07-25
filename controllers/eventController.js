const Event = require("../models/Event");
const upload = require("../utils/upload");

// Get ONLY UPCOMING Events (auto-filtered)
const getEvents = async (req, res) => {
  try {
    const today = new Date();

    // Auto-mark events with past dates as expired
    await Event.updateMany(
      { date: { $lt: today }, status: "active" },
      { $set: { status: "expired" } }
    );

    const events = await Event.find({
      date: { $gte: today },
      status: "active"
    }).sort({ date: 1 });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Add a new event
const addEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const image = req.file ? req.file.path : null;

  if (!image) return res.status(400).json({ message: "Image is required" });

  try {
    const newEvent = new Event({ title, description, date, image });
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully!", newEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Update Event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );
    res.json({ message: "Event updated successfully!", updatedEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Manually change status (active/expired)
const updateEventStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "expired"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updated = await Event.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: `Event marked as ${status}`, updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  updateEventStatus,
};
