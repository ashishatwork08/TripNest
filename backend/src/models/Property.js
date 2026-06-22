const mongoose = require('mongoose');
const propertySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        coordinates:{
            lat: { type: Number},
            lng: { type: Number},
        }
    },
    images:[
        {
            url:{type:String},
            public_id:{type:String},    // cloudinary public ID for image management
        },
    ],
    amenities: [
      {
        type: String,
        enum: [
          "wifi",
          "ac",
          "parking",
          "pool",
          "gym",
          "kitchen",
          "tv",
          "washing_machine",
        ],
      },
    ],
    propertyType:{
        type:String,
        enum: ["apartment", "house", "villa", "hotel", "hostel"],
        required:true,
    },
    host:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    maxGuests:{
        type:Number,
        required:true
    },bedrooms:{
        type:Number,
        default:1
    },
    bathrooms:{
        type:Number,
        default:1
    },  
    isAvailable:{
        type:Boolean,
        default:true
    },
    bookingCount:{
        type:Number,
        default:0
    },
    bestSeason:{
        type:[String],
        enum: ["winter","spring", "summer", "monsoon","autumn","all"],
        default:["all"]
    },
    isFeatured:{
        type:Boolean,
        default:false
    },

    ratings:{
        average:{type:Number, default:0},
        count:{type:Number, default:0},
    },
},
{
    timestamps:true
}
);
propertySchema.index({ "title": "text", "description": "text","location.city": "text"  });   // For geospatial queries
propertySchema.index({"location.coordinates": "2dsphere"});  // For geospatial queries
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
