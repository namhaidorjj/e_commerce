/** @format */

import AdminUser from "../models/adminUser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("JWT SECRET KEY not found");
}

// Creating Admin User Scene ==============================
export const createAdminUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, phone, password, role } = req.body;
  try {
    const userExist = await AdminUser.findOne({ email }); // Searching email address from MongoDB
    if (userExist) {
      return res.status(400).send({
        message: `${email} имэйл хаягтай админ бүртгэгдсэн байна`, // Sending error when found same email address
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10); // Hashing password
    const user = await AdminUser.create({
      name,
      email,
      phone,
      password: encryptedPassword,
      role,
    });
    return res
      .status(201)
      .send({ user, message: "Админ амжилттай бүртгэгдлээ" });
  } catch (error) {
    res.status(500).send({ message: "Бүртгүүлэхэд алдаа гарлаа" });
  }
};
// Login Scene ===================================
export const loginAdmin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return res.status(400).send({
        message: `${email} имэйл хаягтай админ бүртгэгдээгүй байна`,
      });
    }

    const decryptedPassword = await bcrypt.compare(
      password,
      adminUser.password
    );
    if (!decryptedPassword) {
      return res.status(400).send({ message: `Нууц үг таарахгүй байна` });
    }

    const token = jwt.sign(
      { userId: adminUser._id, email: email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    ); // Making new token

    res.status(200).send({ message: "Амжилттай нэвтэрлээ", token }); // Sending user if found one
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Холболтонд алдаа гарлаа" });
  }
};

// Sending user who logged in ==========================
export const adminUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await AdminUser.findOne({ _id: id });
    res.status(200).json({ user, message: "Хэрэглэгч амжилттай ирлээ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Хэрэглэгч авч ирэхэд асуудал үүсэв" });
  }
};
