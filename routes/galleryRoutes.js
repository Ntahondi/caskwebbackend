const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const upload = require("../middlewares/upload");

router.post("/upload", upload.array("images", 10), galleryController.uploadImages);
router.get("/", galleryController.getImages);
router.delete("/:id", galleryController.deleteImage);

module.exports = router;
