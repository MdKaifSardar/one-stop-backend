import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000, // Increase timeout duration
      connectTimeoutMS: 30000,
    });
    console.log("Database connected");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};

export default connectDB;
