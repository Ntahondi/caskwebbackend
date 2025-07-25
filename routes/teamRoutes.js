const express = require("express");
const router = express.Router();
const {
  getTeam,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");
const upload = require("../utils/upload");

// Get all team members
router.get("/", getTeam);

// Add a new team member (with image upload)
router.post("/", upload.array("images"), addTeamMember);

// Update a team member (with image upload)
router.put("/:id", upload.array("images"), updateTeamMember);

// Delete a team member
router.delete("/:id", deleteTeamMember);

module.exports = router;