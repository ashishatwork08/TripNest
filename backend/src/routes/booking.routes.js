const express = require('express');
const {
    makeBooking,
    getMyBookings,
   cancelBooking,
   checkDates,
} = require('../controllers/booking.controller');

                    // Authenticate middleware
    const {authenticate}= require('../middlewares/auth.middleware');
    const router = express.Router();

    router.post("/", authenticate, makeBooking);
    router.get("/my", authenticate, getMyBookings);
    router.put("/cancel/:id", authenticate, cancelBooking);
    router.get("/check",checkDates);

    module.exports = router;