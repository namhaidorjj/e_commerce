/** @format */

import { Sign } from "crypto";
import { Router } from "express";
import { signUp } from "../controllers/userController";

export const router = Router();

router.route("/createUser").post(signUp);
