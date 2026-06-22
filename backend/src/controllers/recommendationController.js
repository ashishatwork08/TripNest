const Property = require('../models/Property');
const Booking = require('../models/Booking');

const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11

    if (currentMonth >= 11 || currentMonth <= 2) {
        return "winter";
    } if (currentMonth >= 3 && currentMonth <= 5) {
        return "spring";
    } if (currentMonth >= 6 && currentMonth <= 9) {
        return "monsoon";
    }
    return "autumn";
};
// Featured Property
exports.getFeatured = async (req, res) => {
    try {
        let featuredProperty = await Property.findOne({
            isFeatured: true,
            isAvailable: true
        }).populate("host", "name");

        if (!featuredProperty) {
            featuredProperty = await Property.findOne({
                isAvailable: true
            })
                .sort({ "ratings.average": -1, createdAt: -1 })
                .populate("host", "name");
        }

        return res.status(200).json({
            success: true,
            property: featuredProperty
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch featured property",
        });
    }
};

// Trending Propertied
exports.getTrending = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(
            Date.now() - (7 * 24 * 60 * 60 * 1000)
        );
        const trendingProperties = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: "$property",
                    bookingCount: { $sum: 1 }
                }
            },
            {
                $sort: {
                    totalBooking: -1
                }
            },
            {
                $limit: 6
            }
        ]);

        const propertyIds = trendingProperties.map(
            property => property._id
        );
        const properties = await Property.find({
            _id: { $in: propertyIds },
            isAvailable: true
        }).populate("host", "name");

        return res.status(200).json({
            success: true,
            properties
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch trending properties",
        });
    }
};

// Seasonal Properties
exports.getSeasonal = async (req, res) => {
    try {
        const currentSeason = getCurrentSeason();
        const seasonalProperties = await Property.find({
            isAvailable: true,
            $or: [
                { bestSeason: { $in: [currentSeason, "all"] } },
                { bestSeason: { $exists: false } },
                { bestSeason: { $size: 0 } }
            ]
        })
            .sort({ "ratings.average": -1 })
            .limit(6)
            .populate("host", "name");

        return res.status(200).json({
            success: true,
            season: currentSeason,
            properties: seasonalProperties
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch seasonal properties",
        });
    }
};
