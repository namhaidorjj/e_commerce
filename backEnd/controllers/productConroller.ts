/** @format */
import Bag from "../models/bagModel";
import Color from "../models/colorModel";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const product = async (req: Request, res: Response) => {
  try {
    const bag = await Bag.find({}).populate("colors");
    // const bagColor = await Color.find({});
    res.status(200).json({ bag, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed" });
  }
};

// Updating Products ===================================================
export const productUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedBag = req.body;
  try {
    const bag = await Bag.findByIdAndUpdate(id, updatedBag, { new: true });
    if (!bag) {
      return res.status(404).json({ message: "Цүнх олдсонгүй" });
    }
    if (updatedBag.colors) {
      // Loop through each updated color
      for (const updatedColor of updatedBag.colors) {
        // Find the corresponding color document by _id
        const existingColor = await Color.findById(updatedColor._id);

        // Update the color fields
        if (existingColor) {
          existingColor.color = updatedColor.color;
          existingColor.adminColor = updatedColor.adminColor;
          existingColor.consumer = updatedColor.consumer;
          existingColor.bagCode = updatedColor.bagCode;
          // Save the updated color document
          await existingColor.save();
        }
      }
    }
    return res.json({ message: "Цүнх амжилттай засагдлаа", bag });
  } catch (error) {
    console.error("Цүнх засварлахад алдаа гарлаа:", error);
    return res.status(500).json({ message: "Цүнх засварлахад алдаа гарлаа" });
  }
};

// Deleting Products ===================================================
export const productDelete = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    await Bag.deleteOne({ _id });
    await Color.deleteMany({ bagId: _id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("error in delete product", error);
    return res.status(400).json({ message: "Failed to delete product" });
  }
};

// Getting one product to edit =========================================
export const productEdit = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const product = await Bag.findOne({ _id }).populate("colors");
    res
      .status(200)
      .json({ message: "Succesfully fetch product data", product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Getting problem to send product data" });
  }
};
// Updating status in Colors ===========================================
export const colorEdit = async (req: Request, res: Response) => {
  try {
    const colorId = req.params.id;
    const { status, email, userName } = req.body;
    console.log(colorId, "colorId");
    console.log(status, "status");
    const updatedColor = await Color.findByIdAndUpdate(
      colorId,
      { status },
      { new: true }
    );
    if (updatedColor) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: process.env.EMAIL_USER, pass: process.env.APP_PASSWORD },
      });
      const mailOption = {
        from: "luxuries.bag.store4@gmail.com",
        to: email,
        subject: `Барааны төлөв: ${status}`,
        text: `Эрхэм хүндэт ${userName},

        Таны бараа "${status}" төлөв рүү шилжив.

        Хүндэтгэсэн
        CELESTIA CARRY LLC
        email: celestia.carry.mn@gmail.com`,
      };
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          res
            .status(500)
            .send({ message: "Имэйл явуулахад асуудал тулгарлаа" });
        } else {
          res.status(201).send({
            message: `Хэрэглэгч рүү ${status} төлвийн мэдээллийг имэйлдэв!`,
          });
        }
      });
      return res.status(200).json({
        message: "Төлөв амжилттай солигдлоо",
        color: updatedColor,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Төлөв солих явцад асуудал үүсэв" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Төлөв солиход асуудал үүслээ" });
  }
};
