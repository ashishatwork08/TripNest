const express = require("express");
const router = express.Router();
const { addReview, getPropertyReviews } = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/:propertyId", authenticate, addReview);
router.get("/:propertyId", getPropertyReviews);

module.exports = router;