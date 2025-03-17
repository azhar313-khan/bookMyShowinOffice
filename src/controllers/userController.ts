import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secretKey = process.env.JWT_SECRET || "test";

const generateToken = (userId: any) => {
  return jwt.sign({ id: userId }, secretKey, {
    expiresIn: "1h",
  });
};

export const getAPi = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get Api",
  });
};
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    let { name, email, password } = req.body;
    password = String(password);
    if (!password || typeof password !== "string") {
      res.status(402).json({
        message: "invalid Password",
      });
      return;
    }
    const userExit = await User.findOne({
      email,
    });
    if (userExit) {
      res.status(401).json({
        message: "User Mail Already Exit",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = generateToken((await user)._id);
    res.status(201).json({
      message: "User Registration Successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    let { email, password } = req.body;
    password = String(password);
    const userExit = await User.findOne({ email });
    if (!userExit) {
      res.status(401).json({
        message: "User is not found,Please Sign Up",
      });
      return;
    }
    const isMatch = await bcrypt.compare(String(password), userExit.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Password is Wrong",
      });
      return;
    }
    const token = await generateToken(userExit._id);
    res.status(200).json({
      message: "Login Successfully ",
      token,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, password, email } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({
        message: "User not find",
      });
      return;
    }
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }
    await user.save();
    res.status(201).json({
      message: "Profile Update Successfully",
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};
