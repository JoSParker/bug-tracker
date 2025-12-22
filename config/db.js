const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jsamuelp181_db_user:ryHor1x3Cov6ugNe@bugtrackerdb.nwqqrag.mongodb.net/?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
