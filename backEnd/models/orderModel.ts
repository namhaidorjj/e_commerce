/** @format */

import { Model, Schema, model, models } from "mongoose";

type OrderSchemaType = {
  userId: Schema.Types.ObjectId;
  colors: Schema.Types.ObjectId;
  bagId: Schema.Types.ObjectId;
  payment: string;
  CreatedAt: Date;
  UpdatedAt: Date;
};

const OrderSchema: Schema = new Schema<OrderSchemaType>({
  userId: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  colors: [{ type: Schema.Types.ObjectId, ref: "Color", required: true }],
  bagId: { type: Schema.Types.ObjectId, ref: "Bag", required: true },
  payment: { type: String, required: true, enum: ["Paid", "Not_Paid"] },
  CreatedAt: { type: Date, default: new Date() },
  UpdatedAt: { type: Date, default: new Date() },
});

const Order: Model<OrderSchemaType> =
  models["Order"] || model("Order", OrderSchema);
export default Order;
