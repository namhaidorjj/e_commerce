"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingCardSchema = void 0;
const mongoose_1 = require("mongoose");
exports.shoppingCardSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
    },
    productCount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: [true, " Please check createdAt"],
    },
    updatedAt: {
        type: Date,
        default: new Date(),
        required: [true, " Please check createdAt"],
    },
});
