import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoURL = process.env.MONGODB_URI;
if (!MongoURL) {
  console.error("MONGODB_URI is not defined in the environment variables.");
  process.exit(1);
}
const dbConfig = async () => {
  try {
    await mongoose.connect(MongoURL);
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default dbConfig;
