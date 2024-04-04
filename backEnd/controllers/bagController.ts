/** @format */
import Bag from "../models/bagModel";
import Color from "../models/colorModel";
import { Request, Response } from "express";

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


export const bag = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const bag = await Bag.findOne({ _id: id }).populate("colors");
    res.status(200).json({ bag, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed by get bag" });
  }
};

export const bagCreate = async (req: Request, res: Response) => {
  const { bagName, price, brand, bagType, sale, colors } = req.body;

  try {
    let colorIds = [];
    let newBagId;

    const newBag = await Bag.create({
      bagName,
      price,
      brand,
      bagType,
      sale,
      colors: [],
    });
    newBagId = newBag._id;

    for (const color of colors) {
      const createColor = await Color.create({
        color: color.colorName,
        adminColor: color.adminColor,
        bagId: newBagId,
        bagCode: color.bagCode,
        images: color.images,
        consumer: color.consumer,
        status: color.status,
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
