const Property = require("../models/Property"); // yeh add karo
const Booking = require("../models/Booking");

const {
    createBooking,
    checkAvailability,
} = require ('../services/booking.service');


                                 // Create Booking 
const makeBooking = async (req, res) => {
                           // Get data from request body
    try { 
        const {
            propertyId,
            checkIn,
            checkOut,
            guests,
        } = req.body;
                                // validate input
        if(!propertyId || !checkIn || !checkOut || !guests) 
            {
                 return res.status(400).json({
                message:"All fields are required",
                });
            }

        const booking = await createBooking({
            propertyId,
            userId: req.user.userId,
            checkIn,
            checkOut,
            guests,                    
        });
        await Property.findByIdAndUpdate(propertyId, { $inc: { bookingCount: 1 } });

                                    // Send success response 
        return res.status(201).json({
            success:true,
            message:"Booking created successfully",
            booking,
        });
    } catch (error) {
        console.log("Boooking Error:", error);
        return res.status(400).json({
            success:false,
            message: error.message,
        });
    }
};
        // to access logged in user booking
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user:req.user.userId,    
        })
        .populate(
            "property",
            "title location price"
        )
        .sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success:true,
            total: bookings.length,
            bookings,
        });
    } catch (error) {
        console.log("Get My Bookings Error:", error);
        return res.status(500).json({
            success:false,
            message: "Failed to retrieve bookings",
        });
    }
};
                                      // Cancel booking
const cancelBooking = async (req, res) =>{
    try {
                    // FInd booking by ID
        const booking = await Booking.findById(req.params.id);
                        // check Booking exists
        if(!booking) {
            return res.status(404).json({
                message:"Booking not found",
            });
        }
                                 // Only booking owner can cancel booking
        if(booking.user.toString() !== req.user.userId)
        {
            return res.status(403).json({
                message:"Unauthorized to cancel this booking",
            });
        }
                                //   check already cancelled
            if(booking.status === "cancelled") {
                return res.status(400).json({
                    message:"Booking is already cancelled",
                });
            }
                         // Update booking status to cancelled 
        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json({
            success:true,
            message:"Booking cancelled successfully",
            booking,
        });
    }
    catch (error) {
        console.log("Cancel Booking Error:", error);
        return res.status(500).json({
            success:false,
            message: "Failed to cancel booking",
        });
    }
};
                            // check availability of property for given dates
    const checkDates = async (req, res) => {
        try {
            const { 
                propertyId,
                checkIn,
                checkOut 
            } =  req.query;
                            // Validate input
     if(!propertyId ||!checkIn ||!checkOut) {
        return res.status(400).json({
            message:"All fields are required",
        });
     }              
                            // Check availability
     const isAvailable = await checkAvailability(
        propertyId,
        checkIn,
        checkOut
     );
        return res.status(200).json({
            success:true,
            available: isAvailable,
            message: isAvailable ? "Property is available for the selected dates" : "Property is not available for the selected dates",
        });
        } catch (error) {
            console.log("Check Availability Error:", error);
            return res.status(500).json({
                success:false,
                message: "Failed to check availability",
            });
        }
    };

module.exports = {
    makeBooking,
    getMyBookings,
    cancelBooking,
    checkDates,
};