const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Add this line
require("dotenv").config();

const connectDB = require("./config/database");

const menuRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const teamRoutes = require("./routes/teamRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adRoutes = require("./routes/adRoutes");
const runExpireAdsJob = require("./cron/expireAdsJob");

const app = express();
const PORT = process.env.PORT || 5000;

// Run the cron job to expire ads every hour
runExpireAdsJob();
// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public/images" folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ads", adRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});