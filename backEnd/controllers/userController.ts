/** @format */

import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const getUser = async (req: Request, res: Response) => {
  const _id = req.body.userId;
  try {
    const users = await User.findOne({ _id });
    res.status(201).json({ users, messege: "fetch data seccess" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const signIn = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = jwt.sign({ id: user._id }, JWT_SECRET as string, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET as string, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header({ Authorization: `Bearer ${accessToken}` })
        .json({ accessToken, user });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, phoneNumber, password, address, userName } =
    req.body.data.user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      phoneNumber,
      address,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header({ Authorization: accessToken })
      .send(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create account" });
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  const { _id, userName, email, phoneNumber, address } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await User.updateOne(
      { _id },
      {
        $set: {
          userName,
          email,
          phoneNumber,
          address,
        },
      }
    );
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("error in delete user", error);
    return res.status(400).json({ message: "Failed to delete user" });
  }
};
