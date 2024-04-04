"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for your document
const ColorSchema = new mongoose_1.Schema({
    color: { type: String, required: true },
    adminColor: { type: String },
    bagId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Bag", required: true },
    bagCode: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    consumer: { type: String },
    status: { type: String },
    CreatedAt: { type: Date, default: new Date() },
    UpdatedAt: { type: Date, default: new Date() },
});
const Color = (0, mongoose_1.model)("Color", ColorSchema);
exports.default = Color;
