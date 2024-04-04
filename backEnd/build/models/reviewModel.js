"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewSchema = new mongoose_1.Schema({
    productId: {
        type: String,
    },
    stars: {
        star1: {
            type: Number,
        },
        star2: {
            type: Number,
        },
        star3: {
            type: Number,
        },
        star4: {
            type: Number,
        },
        star5: {
            type: Number,
        },
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
