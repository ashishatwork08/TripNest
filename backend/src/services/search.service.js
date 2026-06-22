const Property = require('../models/Property');
const Booking = require("../models/Booking");
const redis=require("../config/redis");

const searchProperties = async (filter) => {
    const {
        keyword,
        city,
        minPrice,
        maxPrice,
        propertyType,
        amenities,
        maxGuests,
        checkIn,
        checkOut,
        page = 1,
        limit = 10,
    } = filter;

    const cacheKey = `search:${JSON.stringify(filter)}`;
    const cached = await redis.get(cacheKey);
    if(cached)
    {
        console.log("Cache hit");
        return JSON.parse(cached);
    }
    console.log("Cache miss");

    let bookedPropertyIds = [];
    if(checkIn && checkOut){
       const conflictingBookings = await Booking.find({
        status: { $ne: "cancelled" },
        checkIn: {
           $lt: new Date(checkOut) 
        },
        checkOut: {
          $gt: new Date(checkIn),
        },
       }).select("property");

       bookedPropertyIds = conflictingBookings.map(
        (booking) => booking.property
        );
    }
       
    const query = {isAvailable: true};
    if (bookedPropertyIds.length > 0) 
    {
      query._id = {
        $nin: bookedPropertyIds,
      };
    }

    if(keyword){
        query.$text ={$search: keyword};
    }
        if(city){
            query["location.city"] = {$regex: city, $options: "i"};
        }
            if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
 if (propertyType) {
    query.propertyType = propertyType;
  }
   if (maxGuests) {
    query.maxGuests = { $gte: Number(maxGuests) };
  }
  if (amenities) {
    const amenitiesArray = amenities.split(",");
    query.amenities = { $all: amenitiesArray };
  }

   const skip = (page - 1) * limit;

  const properties = await Property.find(query)
    .populate("host", "name avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

     const total = await Property.countDocuments(query);

  const result = {
    properties,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
    fromCache: false,
  };
 const ttl= checkIn && checkOut ? 60 : 300;
 await redis.setex(
  cacheKey,
  ttl,
  JSON.stringify(result)
 );

  return result;
};
module.exports = { searchProperties };
    