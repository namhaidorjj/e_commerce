/** @format */

import { Router } from "express";
import { addOrder, getOrder } from "../controllers/orderController";
export const router = Router();

router.route("/order").post(getOrder);
router.route("/addOrder").post(addOrder);
