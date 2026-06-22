const express = require('express');
const router = express.Router();
const { getTrending, getSeasonal, getFeatured } = require('../controllers/recommendationController');

router.get("/trending", getTrending);
router.get("/seasonal", getSeasonal);
router.get("/featured", getFeatured);

module.exports = router;