const express = require("express");
const {
  getMenu,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} = require("../controllers/menuController");
const upload = require("../utils/upload");

const router = express.Router();

router.get("/", getMenu);
router.post("/", upload.array("images"), addMenuCategory);
router.put("/:id", upload.array("images"), updateMenuCategory); // Added multer middleware
router.delete("/:id", deleteMenuCategory);

module.exports = router;