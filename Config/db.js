import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export default connectDB;