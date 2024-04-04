"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    productName: String,
    description: String,
    productCode: Number,
    img: String,
    mainPrice: Number,
    qty: Number,
    color: String,
    size: String,
    tag: String,
    mainCategory: String,
    category: String,
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
