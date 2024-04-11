/** @format */

import { Router } from "express";
import {
  addOrder,
  getOrder,
  getOrderToAdmin,
  getOrderDetail,
  deleteOrder,
  getOrderByDate,
} from "../controllers/orderController";
export const router = Router();

router.route("/order").post(getOrder);
router.route("/addOrder").post(addOrder);
router.route("/deleteOrder").delete(deleteOrder);
router.route("/orderToAdmin").get(getOrderToAdmin); // Getting data to Admin Page
router.route("/orderDetail/:id").get(getOrderDetail); // Getting data to OrderDetail component
router.route("/orderByDate").get(getOrderByDate); // Getting data by Date to DashBoard
