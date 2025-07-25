const Menu = require("../models/Menu");
const upload = require("../utils/upload");
const mongoose = require("mongoose");

// Get all menu items
const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new menu category with image upload
const addMenuCategory = async (req, res) => {
  try {
    // Extract and parse the `data` field
    const { groupName, categories } = JSON.parse(req.body.data);

    // Handle uploaded images (if any)
    const files = req.files || [];
    const images = files.map((file) => file.path); // Extract paths of uploaded images

    // Create the new menu group with categories
    const newMenuGroup = new Menu({
      groupName,
      categories: categories.map((category) => ({
        name: category.name,
        items: category.items,
        images: category.images || [], // Use uploaded images or default to an empty array
      })),
    });

    await newMenuGroup.save();
    res.status(201).json({ message: "Menu group added successfully!", newMenuGroup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a menu category
const updateMenuCategory = async (req, res) => {
  const { id } = req.params; // ID of the menu group to update

  try {
    // Check if req.body.data exists
    if (!req.body.data) {
      return res.status(400).json({ message: "Missing 'data' field in request body" });
    }

    // Parse the data field
    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in 'data' field" });
    }

    const { categoryIndex, images } = data; // Extract categoryIndex and images from parsed data

    // Handle uploaded images (if any)
    const files = req.files || [];
    const updatedImages = files.map((file) => file.path); // Extract paths of uploaded images

    // Find the existing menu group
    const existingMenuGroup = await Menu.findById(id);
    if (!existingMenuGroup) {
      return res.status(404).json({ message: "Menu group not found" });
    }

    // Check if categoryIndex is valid
    if (categoryIndex < 0 || categoryIndex >= existingMenuGroup.categories.length) {
      return res.status(400).json({ message: "Invalid category index" });
    }

    // Update the images for the specified category
    if (updatedImages.length > 0) {
      existingMenuGroup.categories[categoryIndex].images = updatedImages;
    } else if (images && Array.isArray(images)) {
      // If no new images are uploaded, use the provided images array
      existingMenuGroup.categories[categoryIndex].images = images;
    }

    // Save the updated menu group
    const updatedMenuGroup = await existingMenuGroup.save();

    res.json({ message: "Menu category images updated successfully!", updatedMenuGroup });
  } catch (err) {
    console.error("Error updating menu category images:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a menu category
const deleteMenuCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.json({ message: "Menu category deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMenu, addMenuCategory, updateMenuCategory, deleteMenuCategory };