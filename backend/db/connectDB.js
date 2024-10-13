import createHttpError from "http-errors";
import mongoose from "mongoose";
import { DotEnvConfig } from "../config/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("error", error => {
      console.log(`MongoDB connection error: ${error}`);
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully to the Local Machine");
    });

    const DbInstance = await mongoose.connect(DotEnvConfig.mongodb.uri, {
      dbName: DotEnvConfig.mongodb.name,
    });

    console.log(`MongoDB Connected to ${DotEnvConfig.mongodb.name}`);
  } catch (error) {
    const errorMessage = createHttpError(500, error.message);
    throw errorMessage;
  }
};

export default connectDB;
