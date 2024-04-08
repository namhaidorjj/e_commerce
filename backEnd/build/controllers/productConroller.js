"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productEdit = exports.productDelete = exports.productUpdate = exports.product = void 0;
/** @format */
const bagModel_1 = __importDefault(require("../models/bagModel"));
const colorModel_1 = __importDefault(require("../models/colorModel"));
const product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bag = yield bagModel_1.default.find({}).populate("colors");
        // const bagColor = await Color.find({});
        res.status(200).json({ bag, message: "Successfully get file" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed" });
    }
});
exports.product = product;
// Updating Products ===================================================
const productUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedBag = req.body;
    try {
        const bag = yield bagModel_1.default.findByIdAndUpdate(id, updatedBag, { new: true });
        if (!bag) {
            return res.status(404).json({ message: "Цүнх олдсонгүй" });
        }
        if (updatedBag.colors) {
            // Loop through each updated color
            for (const updatedColor of updatedBag.colors) {
                // Find the corresponding color document by _id
                const existingColor = yield colorModel_1.default.findById(updatedColor._id);
                // Update the color fields
                if (existingColor) {
                    existingColor.color = updatedColor.color;
                    existingColor.adminColor = updatedColor.adminColor;
                    existingColor.bagCode = updatedColor.bagCode;
                    // Save the updated color document
                    yield existingColor.save();
                }
            }
        }
        return res.json({ message: "Цүнх амжилттай засагдлаа", bag });
    }
    catch (error) {
        console.error("Цүнх засварлахад алдаа гарлаа:", error);
        return res.status(500).json({ message: "Цүнх засварлахад алдаа гарлаа" });
    }
});
exports.productUpdate = productUpdate;
// Deleting Products ===================================================
const productDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        yield bagModel_1.default.deleteOne({ _id });
        yield colorModel_1.default.deleteMany({ bagId: _id });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("error in delete product", error);
        return res.status(400).json({ message: "Failed to delete product" });
    }
});
exports.productDelete = productDelete;
// Getting one product to edit =========================================
const productEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const product = yield bagModel_1.default.findOne({ _id }).populate("colors");
        res
            .status(200)
            .json({ message: "Succesfully fetch product data", product });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Getting problem to send product data" });
    }
});
exports.productEdit = productEdit;
