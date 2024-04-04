"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for your document
const BagSchema = new mongoose_1.Schema({
    bagName: { type: String },
    colors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Color", required: true }],
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
const Bag = (0, mongoose_1.model)("Bag", BagSchema);
exports.default = Bag;
