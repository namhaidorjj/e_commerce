/** @format */

import { Router } from "express";
import {
  addOrder,

  getOrder,
  getOrderToAdmin,
  getOrderDetail,

  deleteOrder,
  getOrder,

} from "../controllers/orderController";
export const router = Router();

router.route("/order").post(getOrder);
router.route("/addOrder").post(addOrder);

router.route("/orderToAdmin").get(getOrderToAdmin); // Getting data to Admin Page
router.route("/orderDetail/:id").get(getOrderDetail); // Getting data to OrderDetail component

router.route("/deleteOrder").delete(deleteOrder);

