const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" }, // Optional
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [menuItemSchema], // List of items in this category
  images: [{ type: String }], // Optional: Images for this category
});

const menuGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true }, // E.g., "Juice & Smoothies"
  categories: [categorySchema], // List of categories in this group
});

module.exports = mongoose.model("Menu", menuGroupSchema);