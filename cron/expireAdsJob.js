// cron/expireAdsJob.js
const cron = require("node-cron");
const Ad = require("../models/Ad");
const Event = require("../models/Event");

const runExpireAdsJob = () => {
  // Schedule: runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();

      // Find and update expired ads
      const result = await Ad.updateMany(
        { expireDate: { $lte: now }, status: "active" },
        { $set: { status: "expired" } }
      );

      console.log(`[CRON] Ad Expiry Job ran at ${now.toISOString()} - ${result.modifiedCount} ads marked as expired.`);
    } catch (err) {
      console.error("[CRON] Ad Expiry Job Error:", err.message);
    }
  });
};

cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    const result = await Event.updateMany(
      { date: { $lt: now }, status: "active" },
      { $set: { status: "expired" } }
    );
    console.log(`[CRON] Event Expiry Job - ${result.modifiedCount} expired.`);
  });
  

module.exports = runExpireAdsJob;
