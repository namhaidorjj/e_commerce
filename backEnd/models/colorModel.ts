/** @format */

import { Schema, model } from "mongoose";

// Define the schema for your document
const ColorSchema: Schema = new Schema({
  color: { type: String, required: true },
  adminColor: { type: String },
  bagId: { type: Schema.Types.ObjectId, ref: "Bag", required: true },
  bagCode: { type: String, required: true, unique: true },
  images: { type: [String], required: true },
  consumer: { type: String },
  status: { type: String },
  CreatedAt: { type: Date, default: new Date() },
  UpdatedAt: { type: Date, default: new Date() },
});

const Color = model("Color", ColorSchema);
export default Color;
