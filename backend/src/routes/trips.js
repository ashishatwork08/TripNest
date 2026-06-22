const express=require('express');
const router=express.Router();
const {generateItinerary}=require('../controllers/tripController');

router.post('/generate',generateItinerary);

module.exports=router;