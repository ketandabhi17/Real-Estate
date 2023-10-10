import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const validUser: any = await User.findOne({ email }).exec();
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET as string
    );
    const {
      password: pass,
      updatedAt,
      _id,
      createdAt,
      ...rest
    } = validUser._doc;
    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};
