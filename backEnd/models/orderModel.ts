/** @format */

import { Model, Schema, model, models } from "mongoose";

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  colors: { type: Schema.Types.ObjectId, ref: "Color", required: true },
  bagId: { type: Schema.Types.ObjectId, ref: "Bag", required: true },
  CreatedAt: { type: Date, default: new Date() },
  UpdatedAt: { type: Date, default: new Date() },
});

const Order: Model<OrderSchemaType> =
  models["Order"] || model("Order", OrderSchema);
export default Order;
