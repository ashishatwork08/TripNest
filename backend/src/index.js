require('dotenv').config()
const connectDB = require('./config/db')
const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const authRoutes=require('./routes/auth.routes')
const app=express();
const propertyRoutes = require("./routes/property.routes");
const bookingRoutes = require("./routes/booking.routes");
const tripRoutes = require("./routes/trips");
const recommendationRoutes = require("./routes/recommendations");
const reviewRoutes = require("./routes/reviews");


app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173", // Vite ka port
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/reviews", reviewRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TripNest API running ' })
})

connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})