"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    colors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Color", required: true }],
    bagId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Bag", required: true },
    payment: { type: String, required: true, enum: ["Paid", "Not_Paid"] },
    CreatedAt: { type: Date, default: new Date() },
    UpdatedAt: { type: Date, default: new Date() },
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
