const Review = require("../models/Review");
const property = require("../models/Property");

exports.addReview = async(req,res)=>{
    try{
        const {rating,comment}=req.body;
        const {propertyId}=req.params;

        if(!rating || !comment){
            return res.status(400).json({message: "Rating and comment are required"});
        }

        const existing =await Review.findOne({
            property: propertyId,
            user: req.user.userId,
        });

        if(existing) {
            return res.status(400).json({message: "You have already this property"});
        }
        const review = await Review.create({
            property: propertyId,
            user: req.user.userId,
            rating,
            comment,
        });

        const reviews= await Review.find({property:propertyId});
        const avgRating = review.reduce((sum,r)=> sum+r.rating,0)/ review.length;
        await Property.findByIdAndUpdate(propertyId, {
            "ratings.average": avgRating.toFixed(1),
            "ratings.count": reviews.length,
        });

        const populated = await review.populate("user", "name");
        return res.status(201).json({ success: true, review: populated });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "You have already reviewed this property" });
        }
        return res.status(500).json({ message: "Failed to add review" });
    }
};

exports.getPropertyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ property: req.params.propertyId })
            .populate("user", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
    