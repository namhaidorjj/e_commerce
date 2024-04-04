/** @format */

import * as nodemailer from "nodemailer";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

interface Verify {
  [key: string]: number;
}
let Verify: Verify = {};

export const sendMail = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "batbaatarbattsetseg122@gmail.com",
        pass: "uhkg wcuj ugqf dqvv",
      },
    });

    const otp = Math.floor(Math.random() * 1000000 + 1);

    const info = await transporter.sendMail({
      from: "Pine cone food-delivery <batbaatarbattsetseg122@gmail.com>",
      to: email,
      subject: "Сайн байна уу ?" + email,
      html: "Food-delivery нууц үг сэргээх код:" + otp,
    });
    Verify[user.email] = otp;
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully", otp });
    ``;
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "User not email" });
    }
    if (code !== Verify[email]) {
      return res.status(400).json({ message: "User not email and code match" });
    }

    Verify = {};

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePass = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "User not email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Failed to update password" });
  }
};
