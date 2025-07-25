const express = require("express");
const { getReviews, addReview } = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);

module.exports = router;