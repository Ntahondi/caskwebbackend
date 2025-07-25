const Ad = require("../models/Ad");
const upload = require("../utils/upload");

// Create Ad (Admin) with Image Upload
const createAd = async (req, res) => {
    const { title, description, startDate, expireDate } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded file path
  
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
  
    try {
      const newAd = new Ad({ title, description, image, startDate, expireDate });
      await newAd.save();
      res.status(201).json({ message: "Ad created successfully!", ad: newAd });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get only ACTIVE Ads (User Side)
const getAllAds = async (req, res) => {
  try {
    const today = new Date();

    // Auto-expire outdated ads
    await Ad.updateMany(
      { expireDate: { $lte: today }, status: "active" },
      { $set: { status: "expired" } }
    );

    const activeAds = await Ad.find({
      startDate: { $lte: today },
      expireDate: { $gte: today },
      status: "active"
    }).sort({ createdAt: -1 });

    res.status(200).json(activeAds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Manually update Ad status (expire/unexpire)
const updateAdStatus = async (req, res) => {
  const { adId } = req.params;
  const { status } = req.body;

  if (!["active", "expired"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const ad = await Ad.findByIdAndUpdate(adId, { status }, { new: true });

    if (!ad) return res.status(404).json({ message: "Ad not found" });

    res.status(200).json({ message: `Ad marked as ${status}`, ad });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Ad
const deleteAd = async (req, res) => {
  const { adId } = req.params;

  try {
    const ad = await Ad.findByIdAndDelete(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAd,
  getAllAds,
  deleteAd,
  updateAdStatus,
};
