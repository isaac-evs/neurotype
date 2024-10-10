/* Import Mongoose lybrary and enviorment variables */
import mongoose from "mongoose";
import dotenv from "dotenv";

/* Load the environment variables */
dotenv.config();

/* Connect to the database */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected succesfully");
  } catch (error) {
    console.error("MongooDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
