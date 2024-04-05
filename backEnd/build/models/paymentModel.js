"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.paymentSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
    },
    paymentStatus: {
        enum: ["Paid", "not Paid"],
    },
    paymentType: {
        enum: ["Card", "Qpay", "SocialPay"],
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
