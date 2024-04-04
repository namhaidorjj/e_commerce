"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userDelete = exports.userUpdate = exports.signUp = exports.getUser = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv.config();
const jwtPrivateKey = process.env.JWT_SECRET_KEY;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({});
        res.send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get users" });
    }
});
exports.getUser = getUser;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("user", req.body);
    try {
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield userModel_1.default.create({
            email,
            password: hashedPassword,
        });
        const accessToken = jwt.sign({ id: user._id }, jwtPrivateKey, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign({ id: user._id }, jwtPrivateKey, {
            expiresIn: "1d",
        });
        res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .header({ Authorization: accessToken })
            .send(user);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create account" });
    }
});
exports.signUp = signUp;
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password, phoneNumber, address, cartId, createdAt, _id, } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ _id });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        yield userModel_1.default.updateOne({ _id }, {
            $set: {
                userName,
                email,
                password,
                phoneNumber,
                address,
                cartId,
                createdAt,
            },
        });
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user" });
    }
});
exports.userUpdate = userUpdate;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        console.log(_id, "productID");
        yield userModel_1.default.deleteOne({ _id });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("error in delete user", error);
        return res.status(400).json({ message: "Failed to delete user" });
    }
});
exports.userDelete = userDelete;
