const Gallery = require("../models/Gallery");

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imagePaths = req.files.map((file) => file.path);

    const gallery = new Gallery({ images: imagePaths });
    await gallery.save();

    res.status(201).json(gallery);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload images" });
  }
};


exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error("Get images error:", err);
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
