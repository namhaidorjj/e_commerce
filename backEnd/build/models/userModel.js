"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, " Please check eMail"],
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, " Please check password"],
    },
    address: {
        type: String,
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
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
