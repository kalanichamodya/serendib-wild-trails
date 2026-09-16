import mongoose from "mongoose";
import messages = require("../utils/messages");

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error(messages.config.invalidMongoUri);
    const connection = await mongoose.connect(uri);

    console.log(
      `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`
    );
  } catch (error) {
    console.error(`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export = connectDB;
