import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import cloudinary from "cloudinary";
const PORT = process.env.PORT || 5000;

// Database
connectDB();

// Cludinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Initialize Server
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
