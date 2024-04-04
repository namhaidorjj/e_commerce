/** @format */
import Bag from "../models/bagModel";
import Color from "../models/colorModel";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";

export const GucciBag = async (req: Request, res: Response) => {
  try {
    const bags = await Bag.find({ brand: "Gucci" }).populate("colors");

    res.status(200).json({ bags, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed by get Gucci bag" });
  }
};
export const HermesBag = async (req: Request, res: Response) => {
  try {
    const bags = await Bag.find({ brand: "Hermes" }).populate("colors");

    res.status(200).json({ bags, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed by get Gucci bag" });
  }
};
export const LVBag = async (req: Request, res: Response) => {
  try {
    const bags = await Bag.find({ brand: "LV" }).populate("colors");

    res.status(200).json({ bags, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed by get LV bag" });
  }
};

export const bagCreate = async (req: Request, res: Response) => {
  const { bagName, price, brand, bagType, sale, colors } = req.body;
  // const uploadedImages = req.files;
  // console.log(uploadedImages, "uploadedImages");


  try {
    let colorIds = [];
    let newBagId;

    const newBag = await Bag.create({
      bagName,
      price,
      brand,
      bagType,
      sale,
      // Array руу өнгөнүүдийг хийхэд бэлэн болгоно
      colors: [],
    });
    // newBag-н ID-г нь тусад нь авч байна
    newBagId = newBag._id;

    for (const color of colors) {
      const createColor = await Color.create({
        color: color.colorName,
        adminColor: color.adminColor,
        bagId: newBagId,
        bagCode: color.bagCode,
        images: color.images,
      });

      colorIds.push(createColor._id);
    }
    await Bag.findByIdAndUpdate(newBagId, { colors: colorIds });
    res.status(201).send({ message: "Шинэ цүнх амжилттай үүслээ", newBag });
  } catch (error) {
    console.error(error, "Error in catch");
    res.status(500).send({ message: "Шинэ цүнх үүсгэхэд алдаа гарлаа" });
  }
};
