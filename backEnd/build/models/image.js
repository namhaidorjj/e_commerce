"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true },
});
const Image = (0, mongoose_1.model)("Image", ImageSchema);
exports.default = Image;
