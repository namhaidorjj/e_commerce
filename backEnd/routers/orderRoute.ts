/** @format */

import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
} from "../controllers/orderController";
export const router = Router();

router.route("/order").post(getOrder);
router.route("/addOrder").post(addOrder);
router.route("/deleteOrder").delete(deleteOrder);
router.route("/updateOrderPayment").patch();
