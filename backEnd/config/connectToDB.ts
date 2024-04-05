/** @format */

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("connected");
  } catch (error) {
    console.error(error, "can't connect");
  }
};
