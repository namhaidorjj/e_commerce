/** @format */

import { Request, Response } from "express";
import Order from "../models/orderModel";
import mongoose, { Types } from "mongoose";

export const addOrder = async (req: Request, res: Response) => {
  const { bagId, colorId, userId } = req.body;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(colorId) ||
      !mongoose.Types.ObjectId.isValid(bagId)
    ) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const newOrder = await Order.create({
      userId: mongoose.Types.ObjectId.createFromHexString(userId),
      colors: [mongoose.Types.ObjectId.createFromHexString(colorId)],
      bagId: mongoose.Types.ObjectId.createFromHexString(bagId),
      payment: "Not_Paid",
    });
    res
      .status(201)
      .json({ newOrder, message: "Successfully created new order" });
  } catch (error) {
    console.error("Error creating new order:", error);
    res.status(500).json({ message: "Failed to create new order" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const data = await Order.find({ userId }).populate([
      "colors",
      "bagId",
      "userId",
    ]);
    res.status(200).json({ data, message: "Data retrieved successfully" });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ message: "Failed to fetch order data" });
  }
};


export const deleteOrder = async (req: Request, res: Response) => {
  const { colorId } = req.body;
  try {
    const data = await Order.deleteOne({
      colorId,
    });
    res.status(200).json({ data, message: "Order deleted successfully" });

// Getting data from Order to Admin front page ===========================
export const getOrderToAdmin = async (req: Request, res: Response) => {
  try {
    const data = await Order.find({})
      .populate("bagId")
      .populate("colors")
      .populate("userId");
    console.log(data);
    res.status(200).json({ data, message: "Data retrieved successfully" });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ message: "Failed to fetch order data" });
  }
};

// Getting data from Order to orderDetail page ==============
export const getOrderDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await Order.findById(id).populate([
      "colors",
      "bagId",
      "userId",
    ]);
    if (!data) {
      return res.status(404).json({ error: "Захиалгагч олдсонгүй" });
    }
    res.status(200).json({ data, message: "Захиалагч амжилттай олдлоо" });

  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ message: "Захиалагч олоход алдаа гарлаа" });
  }
};
// Updating Order when paid
export const updateOrder = async (req: Request, res: Response) => {
  const { payment, orderId } = req.body;
  try {
    const data = await Order.findByIdAndUpdate(
      orderId,
      { payment },
      { new: true }
    );

    res.status(200).json({ data, message: "O" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
