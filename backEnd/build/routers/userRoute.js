"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const nodemailer_1 = require("../controllers/nodemailer");
exports.router = (0, express_1.Router)();
exports.router.route("/signin").post(userController_1.signIn);
exports.router.route("/createUser").post(userController_1.signUp);
exports.router.route("/user").get(userController_1.getUser);
exports.router.route("/sendPass").post(nodemailer_1.sendMail);
exports.router.route("/verifyCode").post(nodemailer_1.verifyCode);
exports.router.route("/update").post(nodemailer_1.updatePass);
