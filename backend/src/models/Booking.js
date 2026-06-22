const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
    {
        property:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "Property",
             required: true,
        },
        user: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",
             required: true,
        },
        checkIn:{
            type: Date,
            required: true,
        },
        checkOut: {
            type:Date,
            required:true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        guests: {
            type:Number,
            required:true,
        },
        status: {
         type: String,
         enum: ["pending", "confirmed", "cancelled"],
         default: "pending"   
        },
    },
    { 
        timestamps: true

    }
);
const Booking = mongoose.model("Booking",bookingSchema);
module.exports = Booking;