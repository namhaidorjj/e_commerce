/** @format */

import { Router } from "express";
import {
  addOrder,
  getOrder,
  getOrderToAdmin,
  getOrderDetail,
  deleteOrder,
  paymentMail,
  historyOrder,
} from "../controllers/orderController";
export const router = Router();

router.route("/order").post(getOrder);
router.route("/addOrder").post(addOrder);
router.route("/deleteOrder").delete(deleteOrder);
router.route("/updateOrderPayment").patch();
router.route("/orderToAdmin").get(getOrderToAdmin); // Getting data to Admin Page
router.route("/orderDetail/:id").get(getOrderDetail);
router.route("/mail").post(paymentMail); // Getting data to OrderDetail component
router.route("/history").post(historyOrder);
