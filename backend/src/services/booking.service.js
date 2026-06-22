const Booking = require('../models/Booking');
const Property = require('../models/Property');
const redis= require("../config/redis");

            // check free between checkin and checkout
const checkAvailability = async (
    propertyId,
    checkIn,
    checkOut
) => { 
    //    date ko object me convert krna h
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
                // overlap logic 
    const conflictingBooking = await Booking.findOne({
        property: propertyId,
        status : { $ne: "cancelled"},

        checkIn: { $lt : endDate },
        checkOut: { $gt : startDate},
    });
    return !conflictingBooking;
};
                    // Redis lock for double booking
    const createBooking = async ({
        propertyId,
        userId,
        checkIn,
        checkOut,
        guests,
    })=>{
        const lockKey = `lock:property:${propertyId}`;
        // unique lock pattern
        const lockValue = `${userId}-${Date.now()}`;
        const  lock = await redis.set(
            lockKey,
            lockValue,
            "Ex",10,
            "NX"
        );
        if (!lock) {
            throw new Error("Property is being booked by another user.");
        }
        try {
            const property = await Property.findById(propertyId);
            if(!property) {
                throw new Error("Property not found");
            }
            if(!property.isAvailable) {
                throw new Error("Property is not available");
            }
            if (guests >property .maxGuests) {
                throw new Error (`Maximum ${property.maxGuests} guests allowed`);
            }
            const isAvailable = await checkAvailability(
                propertyId,
                checkIn,
                checkOut
            );
            if(!isAvailable) {
                throw new Error ("Property is not available for the selected dates.");
            }
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = Math.ceil(
                (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
            );
            if(nights <= 0) {
                throw new Error("Invalid booking dates");
            }
            const totalPrice = nights * property.price;

                                // create Booking
            const booking = await Booking.create({
                property: propertyId,
                user: userId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests,
                totalPrice,
                status: "confirmed",
            });
                            // clear search cache   
            const searchKeys = await redis.keys("search:*");  
            if (searchKeys.length > 0) {
                await redis.del(searchKeys);
            }
            return booking;  
        }
        finally {
            const currentLock= await redis.get(lockKey);
            if(currentLock === lockValue) {
                await redis.del(lockKey);
            }
    }
    };
    module.exports = {
        createBooking,
        checkAvailability,  
    };
