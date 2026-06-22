const Property = require("../models/Property.js");
const {searchProperties }= require("../services/search.service");
const createProperty = async (req,res) => {
  try{
 
    const {
      title,
      description,
      price,
      location,
      amenities,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      images,
      bestSeason,
      isFeatured,
    } = req.body;
    const property = await Property.create({
      title,
      description,
      price,
      location,
      amenities,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      images,
      bestSeason,
      isFeatured,
      host: req.user.userId,
  });
  res.status(201).json({
    message: "Property created successfully",
    property,
  });
  }catch(error){
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error while creating property" });
  }
};

const getAllProperties = async (req,res) => {
  try{
    
    const result = await searchProperties(req.query);
    res.status(200).json({...result,fromCache: result.fromCache ?? false,
    });
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "host",
      "name email avatar"
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error("Get property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyProperties = async (req, res) => {
  try {
    console.log("User ID:", req.user.userId); // ye dekho
    const properties = await Property.find({ host: req.user.userId }).sort({ createdAt: -1 });
    console.log("Properties found:", properties.length); // ye dekho
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check kar ki yeh property isi host ki hai
    if (property.host.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated document return karo
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updated,
    });
  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check karo ki yeh property isi host ki hai
    if (property.host.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
};
