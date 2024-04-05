/** @format */

import { Router } from "express";
import { getUser, signUp } from "../controllers/userController";
import { sendMail, updatePass, verifyCode } from "../controllers/nodemailer";

export const router = Router();

router.route("/createUser").post(signUp);
router.route("/user").get(getUser);

router.route("/sendPass").post(sendMail);
router.route("/verifyCode").post(verifyCode);
router.route("/update").post(updatePass);
