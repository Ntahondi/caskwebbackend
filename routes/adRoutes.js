const express = require("express");
const router = express.Router();
const {
    createAd,
    getAllAds,
    deleteAd,
    updateAdStatus,
  } = require("../controllers/adController");
  
const upload = require("../utils/upload");

// Create Ad with Image Upload
router.post("/", upload.single("image"), createAd);

// Get all active Ads
router.get("/", getAllAds);

// Update Ad status
router.patch("/:adId/status", updateAdStatus);

// Delete Ad
router.delete("/:adId", deleteAd);

module.exports = router;