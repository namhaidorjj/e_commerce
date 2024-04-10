/** @format */

import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectToDb } from "./config/connectToDB";
import cloudinary from "./utils/cloudinary";
import upload from "./middleware/multer";
import { router as userRouter } from "./routers/userRoute";
import { router as productRouter } from "./routers/productRoute";
import { router as orderRouter } from "./routers/orderRoute";
import axios from "axios";
const app = express();

dotenv.config();
connectToDb();
const PORT = "8080";

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  "/upload",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ message: "Зураг оруулна уу" });
    }
    try {
      const newImage = await cloudinary.uploader.upload(uploadedFile.path);
      res.status(201).json({
        message: "Image upload success",
        imageUrl: newImage.secure_url,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Image upload failed" });
    }
  }
);
app.post("/createInvoice", async (req: Request, res: Response) => {
  // const invoiceRes = await axios.post(
  //   "https://merchant.qpay.mn/v2/invoice",
  //   {
  //     invoice_code: "POWER_EXPO_INVOICE",
  //     sender_invoice_no: "1234567",
  //     invoice_receiver_code: "terminal",
  //     invoice_description: "test",
  //     amount: 10,
  //     callback_url: "http://localhost:3000",
  //   },
  //   { headers: { Authorization: `Bearer ${req.body.token}` } }
  // );
  // console.log(invoiceRes);
});
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);

app.listen(PORT, () => {
  console.log("application running at: http://localhost:" + PORT);
});

module.exports.app;
