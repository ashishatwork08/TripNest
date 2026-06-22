const cloudinary= require('cloudinary').v2;
const multer= require('multer');
const {CloudinaryStorage}= require('multer-storage-cloudinary');

// cloudnary configuration

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
})

// cloudinary storage configuration
const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"tripnest",
        allowed_formats: ['jpg', 'jpeg', 'png','webp'],
    },
});

// multer configuration
const upload= multer({storage});

module.exports = {cloudinary, upload};