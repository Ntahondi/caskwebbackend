const Review = require("../models/Review");

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new review
const addReview = async (req, res) => {
  const { name, comment } = req.body;

  try {
    const newReview = new Review({ name, comment });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully!", newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getReviews, addReview };