/** @format */

import { Schema, model } from "mongoose";

const BagSchema: Schema = new Schema({
  bagName: { type: String },
  colors: [{ type: Schema.Types.ObjectId, ref: "Color", required: true }],
  price: { type: Number, required: true },
  brand: {
    type: String,
    required: true,
    enum: ["Prada", "LV", "Gucci", "Hermes"],
  },
  bagType: {
    type: String,
    required: true,
    enum: ["Hand_bag", "Accessory_bag", "Travel_bag", "Back_pack"],
  },
  sale: { type: Number },
  CreatedAt: { type: Date, default: new Date() },
  UpdatedAt: { type: Date, default: new Date() },
});

const Bag = model("Bag", BagSchema);
export default Bag;
