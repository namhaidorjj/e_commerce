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
exports.bagCreate = exports.bag = exports.LVBag = exports.HermesBag = exports.GucciBag = void 0;
/** @format */
const bagModel_1 = __importDefault(require("../models/bagModel"));
const colorModel_1 = __importDefault(require("../models/colorModel"));
const GucciBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bagModel_1.default.find({ brand: "Gucci" }).populate("colors");
        res.status(200).json({ bags, message: "Successfully get file" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed by get Gucci bag" });
    }
});
exports.GucciBag = GucciBag;
const HermesBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bagModel_1.default.find({ brand: "Hermes" }).populate("colors");
        res.status(200).json({ bags, message: "Successfully get file" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed by get Gucci bag" });
    }
});
exports.HermesBag = HermesBag;
const LVBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bagModel_1.default.find({ brand: "LV" }).populate("colors");
        res.status(200).json({ bags, message: "Successfully get file" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed by get LV bag" });
    }
});
exports.LVBag = LVBag;
const bag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const bag = yield bagModel_1.default.findOne({ _id: id }).populate("colors");
        res.status(200).json({ bag, message: "Successfully get file" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed by get bag" });
    }
});
exports.bag = bag;
const bagCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bagName, price, brand, bagType, sale, colors } = req.body;
    try {
        let colorIds = [];
        let newBagId;
        const newBag = yield bagModel_1.default.create({
            bagName,
            price,
            brand,
            bagType,
            sale,
            colors: [],
        });
        newBagId = newBag._id;
        for (const color of colors) {
            const createColor = yield colorModel_1.default.create({
                color: color.colorName,
                adminColor: color.adminColor,
                bagId: newBagId,
                bagCode: color.bagCode,
                images: color.images,
                consumer: color.consumer,
                status: color.status,
            });
            colorIds.push(createColor._id);
        }
        yield bagModel_1.default.findByIdAndUpdate(newBagId, { colors: colorIds });
        res.status(201).send({ message: "Шинэ цүнх амжилттай үүслээ", newBag });
    }
    catch (error) {
        console.error(error, "Error in catch");
        res.status(500).send({ message: "Шинэ цүнх үүсгэхэд алдаа гарлаа" });
    }
});
exports.bagCreate = bagCreate;
