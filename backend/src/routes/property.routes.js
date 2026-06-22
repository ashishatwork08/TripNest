const express = require("express");
const {upload}= require("../config/cloudinary");

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require("../controllers/property.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { isHost } = require("../middlewares/role.middleware");

const router = express.Router();


router.get("/", getAllProperties);
router.get("/host/mine", authenticate, isHost, getMyProperties);
router.get("/:id", getPropertyById);

                                // Protected routes (login + host role chahiye)
router.post("/", authenticate, isHost, createProperty);
router.put("/:id", authenticate, isHost, updateProperty);
router.delete("/:id", authenticate, isHost, deleteProperty);
router.post("/upload", authenticate, isHost, upload.array("images", 5), async (req, res) => {
  try {
    console.log("Files:", JSON.stringify(req.files, null, 2)); // debug
    const urls = req.files.map((f) => f.secure_url || f.path);
    res.json({ urls });
  } catch {
    res.status(500).json({ message: "Upload failed" });
  }
});
module.exports = router;