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
exports.updatePass = exports.verifyCode = exports.sendMail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = __importStar(require("bcrypt"));
let Verify = {};
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log(email);
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "batbaatarbattsetseg122@gmail.com",
                pass: "uhkg wcuj ugqf dqvv",
            },
        });
        const otp = Math.floor(Math.random() * 1000000 + 1);
        const info = yield transporter.sendMail({
            from: "Pine cone food-delivery <batbaatarbattsetseg122@gmail.com>",
            to: email,
            subject: "Сайн байна уу ?" + email,
            html: "Food-delivery нууц үг сэргээх код:" + otp,
        });
        Verify[user.email] = otp;
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Email sent successfully", otp });
        ``;
    }
    catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendMail = sendMail;
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "User not email" });
        }
        if (code !== Verify[email]) {
            return res.status(400).json({ message: "User not email and code match" });
        }
        Verify = {};
        res.status(200).json({ message: "Verification successful" });
    }
    catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyCode = verifyCode;
const updatePass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "User not email" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        yield userModel_1.default.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Failed to update password" });
    }
});
exports.updatePass = updatePass;
