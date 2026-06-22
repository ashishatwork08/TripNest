const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected successfully');
    }
    catch(err){
        console.log("MOngoose connection error:",err.message);
        // process.exit(1); //  koi error aane par process ko exit kar dega
    }
}
module.exports=connectDB;
