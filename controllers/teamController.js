const Team = require("../models/Team");
const upload = require("../utils/upload"); // Import the upload middleware

// Get all team members
const getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new team member
const addTeamMember = async (req, res) => {
  const { name, role } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : []; // Get paths of uploaded files

  try {
    const newMember = new Team({ name, role, images });
    await newMember.save();
    res.status(201).json({ message: "Team member added successfully!", newMember });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a team member
const updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : []; // Get paths of uploaded files

  try {
    const updatedMember = await Team.findByIdAndUpdate(
      id,
      { name, role, images },
      { new: true }
    );
    res.json({ message: "Team member updated successfully!", updatedMember });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    await Team.findByIdAndDelete(id);
    res.json({ message: "Team member deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTeam, addTeamMember, updateTeamMember, deleteTeamMember };