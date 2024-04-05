/** @format */

// userRoute.ts

import { Router } from "express";
import { signUp } from "../controllers/userController";
import { sendMail, updatePass, verifyCode } from "../controllers/nodemailer";

export const router = Router();

router.route("/createUser").post(signUp);

router.route("/sendPass").post(sendMail);
router.route("/verifyCode").post(verifyCode);
router.route("/update").post(updatePass);
